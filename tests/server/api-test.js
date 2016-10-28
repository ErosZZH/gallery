/**
 * Created by rick on 2016/10/28.
 */
import request from 'supertest';
import mongoose from 'mongoose';
import expect from 'expect';
import sinon from 'sinon';
import app from '../../server';
import {Image} from '../../server/db';
import config from '../../config';


describe('test apis', () => {
  const db = `mongodb://${config.mongoUrl}/gallery_test`;

  before((done) => {
    mongoose.connect(db, (err) => {
      if (err) {
        console.log(`===>  Error connecting to ${db}`);
        console.log(`Reason: ${err}`);
      } else {
        console.log(`===>  Succeeded in connecting to ${db}`);
        Image.find({}, (err, images) => {
          if(err || !images || images.length === 0) {
            const imageDatas = require('../../server/data/imageDatas.json');
            imageDatas.map(image => {
              const img = new Image(image);
              img.save();
            });
          }
        });
        setTimeout(done, 5000);
      }
    });
  });

  after(() => {
    // drop all collections
    mongoose.connection.collections['images'].drop(() => {
      console.log('image collection dropped');
    });
  });


  describe('test image api', () => {
    beforeEach(() => {
      // To avoid printing too much log by backend code in console.
      sinon.stub(console, 'log', () => {});
    });

// GET /api/fetch
    it('fetch data success', (done) => {
      const url = '/api/fetch';
      request(app)
        .get(url)
        .then(response => {
          console.log.restore();
          expect(response.status).toEqual(200);
          expect(response.body.length).toEqual(16);
          expect(response.body[0].fileName).toEqual('1.jpg');
        })
        .then(done)
        .catch(done);
    });
  });
});
