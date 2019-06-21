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
        Image.find(get, {}, {
            sort:{
                _id: -1
            }
        })
        .populate('UserId')
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static likeUnlike(req, res, next) {
        console.log('masuk likeUnlike')
        Image.findById(req.params.imageId)
        .then(result => {
            if (req.body.option === 'like') {
                if (result.voters.indexOf(req.decoded.id) === -1) {
                    return Image.findByIdAndUpdate(req.params.imageId, {
                        $push: {voters: req.decoded.id}
                      })  
                } else {
                    return result
                }
            } else if (req.body.option === 'unlike') {
                if (result.voters.indexOf(req.decoded.id) !== -1) {
                    return Image.findByIdAndUpdate(req.params.imageId, {
                        $pull: {voters: req.decoded.id}
                      })  
                } else {
                    return result
                }
            }
        })
        .then(data => {
            res.status(200).json({data})
        })
        .catch(next)
        
    }
}

module.exports = UserController
