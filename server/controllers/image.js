const Image = require("../models/image.js")

class UserController{
    static addImage(req,res,next){
        let newImage = {
            image: req.body.image,
            tag: req.body.tag,
            voter: [],
            UserId: req.decoded.id
        }
        Image.create(newImage)
        .then((result) => {
            return Image.populate(result, {path: 'UserId'})
        })
        .then((result) => {
            return Image.populate(result, {path: 'voter'})
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
}

module.exports = UserController
