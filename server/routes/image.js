const routes = require("express").Router()
const ImageController = require("../controllers/image.js")
const {Authentication, Authorization} = require('../middlewares/auth.js')
const TagDetection = require('../helpers/tagDetection')
const image = require('../helpers/imageUpload')


routes.use(Authentication)
routes.post("/", image.multer.single('image'), image.sendUploadToGCS, TagDetection, ImageController.addImage)
routes.delete("/:imageId", Authorization, ImageController.deleteImage)
routes.post("/label-search", ImageController.labelDetection)
routes.get("/", ImageController.findAll)

module.exports = routes