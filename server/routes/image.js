const routes = require("express").Router()
const ImageController = require("../controllers/image.js")
const {Authentication, Authorization} = require('../middlewares/auth.js')
const TagDetection = require('../helpers/tagDetection')
const image = require('../helpers/imageUpload')


routes.use(Authentication)
routes.post("/", image.multer.single('image'), image.sendUploadToGCS, TagDetection, ImageController.addImage)
routes.delete("/:imageId", Authorization, ImageController.deleteImage)
routes.post("/label-search", ImageController.labelDetection)
<<<<<<< HEAD
=======
routes.get("/", ImageController.findAll)
>>>>>>> a0b297250ff92f419441fca83524f39cbe7a904c

module.exports = routes