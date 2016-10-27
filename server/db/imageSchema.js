/**
 * Created by Rick on 26/6/25.
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Image = new Schema({
  fileName: {type: String, required: true},
  title: {type: String, required: true},
  desc: {type: String, required: true}
});

export default mongoose.model('image', Image);
