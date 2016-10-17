/**
 * Created by rick on 2016/10/17.
 */

export function fetchData(req, res) {
  return res.status(200).send(require('../data/imageDatas.json'));
}
