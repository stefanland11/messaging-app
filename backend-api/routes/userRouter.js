const { Router, request } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");

const jwtAuth = require("../config/jwtAuth");

userRouter.post("/sign-up", userController.postSignUp);
userRouter.get("/api/userData", jwtAuth, userController.getUserData);
userRouter.get("/api/users", userController.getAllUsers);

module.exports = userRouter;