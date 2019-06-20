const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: './Vision_API.json'
});

const tagDetection = (req, res, next) => {
  console.log('masuk tag')
  console.log(req.file.cloudStoragePublicUrl);
  client
  .labelDetection(req.file.cloudStoragePublicUrl)
  .then(results => {
    console.log('masuk then');
      const labels = results[0].labelAnnotations;
      let tags = []
      labels.forEach(tag => {
          tags.push(tag.description)
      });
      req.body.tags = tags
      console.log(req.body.tags)
      next()
  })
  .catch(err => {
      console.error('ERROR:', err);
  });
}

module.exports = tagDetection
