const Image = require("../models/image.js")
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: './Vision_API.json'
});

class UserController{
    static labelDetection(req, res, next) {
        client
        .labelDetection(req.body.image)
        .then(results => {
            const labels = results[0].labelAnnotations;
            let tags = []
            labels.forEach(tag => {
                tags.push(tag.description)
            });
            res.status(200).json(labels)
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
    }

    static addImage(req,res,next){
        console.log('masuk add')
        let newImage = {
            image: req.file.cloudStoragePublicUrl,
            tags: req.body.tags,
            voters: [],
            UserId: req.decoded.id
        }
        Image.create(newImage)
        .then((result) => {
            return Image.populate(result, {path: 'UserId'})
        })
        .then((result) => {
            res.status(201).json(result)
        })
        .catch(next)
    }
    static deleteImage(req,res,next){
        let id = req.params.imageId
        Image.deleteOne({_id: id})
        .then((result) => {
            if (result.deletedCount != 0){
                res.status(200).json(result)
            } else {
                throw {
                    code: 404,
                    message: `Image not found`
                }
            }
        })
        .catch(next)
    }
    static findAll(req,res,next){
        let get = {}
        if(req.query.find){
            get.UserId = req.decoded.id
        }
        Image.find(get)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = UserController
