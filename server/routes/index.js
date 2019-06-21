const routes = require("express").Router()
const User = require("./user.js")
const Image = require("./image.js")

routes.use("/", User)
routes.use("/image", Image)

module.exports = routes