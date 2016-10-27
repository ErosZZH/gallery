/**
 * Created by rick on 16/9/29.
 */
import mongoose from 'mongoose';
import Image from './imageSchema';

const connect = (initdb) => {
  mongoose.connect('mongodb://localhost:27017/gallery', err => {
    if (err) {
      console.log("connect mongodb " + err);
    }else{
      console.log("connect mongodb successfully...");
      initdb();
    }
  });
};

const disconnect = () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected.');
  });
};

// Error handler
mongoose.connection.on('error', err => {
  console.log(err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', () => {
  connect();
});

// Connect mongodb
connect(() => {
  Image.find({}, (err, images) => {
    if(err || !images || images.length === 0) {
      const imageDatas = require('../data/imageDatas.json');
      imageDatas.map(image => {
        const img = new Image(image);
        img.save();
      });
    }
  });
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected.');
    process.exit(0);
  });
});

export {Image};

