const routes = require("express").Router()
const ImageController = require("../controllers/image.js")
const {Authentication, Authorization} = require('../middlewares/auth.js')

routes.use(Authentication)
routes.post("/", ImageController.addImage)
routes.delete("/:imageId", Authorization, ImageController.deleteImage)

module.exports = routes