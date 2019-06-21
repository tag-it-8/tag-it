const routes = require("express").Router()
const UserController = require("../controllers/user.js")
const {GoogleAuth} = require('../middlewares/auth.js')

routes.post("/signup", UserController.signup)
routes.post("/signin", UserController.signin)
routes.post("/google", GoogleAuth, UserController.googleSignin)
routes.post("/signout", UserController.signout)

module.exports = routes