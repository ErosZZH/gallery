/**
 * Created by rick on 2016/10/17.
 */
import formidable from 'formidable';
import fs from 'fs';
import gm from 'gm';
import config from '../../config';
import {Image} from '../db';

export function fetchData(req, res) {
  Image.find({}, (err, images) => {
    if(err || !images || images.length === 0) {
      return res.status(500).send('Internal Error.');
    }
    return res.status(200).send(images);
  });
}

export function updateText(req, res) {
  const image = req.body;
  Image.update({_id: image._id}, image, err => {
    if(err) {
      return res.status(500).send('Internal Error.');
    }
    return res.status(200).send('OK');
  });
}

export function uploadImage(req, res) {
  const fileName = req.query.fileName;
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    console.log({fields: fields, files: files});
  });

  form.on('error', err => {
    console.log('-> uploadFollow err', err.message);
    return res.send({code: 500, status: 'error', msg: '上传图片失败'});
  });

  form.on('file', function (field, file) {
    //rename files and save file url
    if (!file)  res.send({code: 500, status: 'error', msg: '上传图片失败'});
    file.name = fileName;
    fs.rename(file.path, `${config.baseDir}/dist/images/${file.name}`);
  });

  form.on('end', function () {
    //compress pics
    gm(`${config.baseDir}/dist/images/${fileName}`)
      .resize(240, 240)
      .noProfile()
      .write(`${config.baseDir}/dist/images/${fileName}`, function (err) {
        if (err) console.error('Write file error. File is: ' + fileName);
        return res.status(200).send('OK');
      });
  });
}
