import express from "express"
import { changePassword, changeResetPassword, deleteUser, forgetPassword, getAllUser, resetPassword, signIn, signUp, updateUser, verifyEmail } from "./user.controller.js"
import { authToken } from "../../middleware/auth/authToken.js"
import { validation } from "../../middleware/validation.js"
import { changePasswordSchema, signInSchema, signUpSchema, updateSchema } from "./user.validation.js"

let router = express.Router()

router.get("/user",  authToken, getAllUser)
router.get("/user/:token", verifyEmail)
router.delete("/delete/:_id", deleteUser)
router.put("/update", validation(updateSchema),updateUser)
router.put("/updatepassword", validation(changePasswordSchema), changePassword)
router.post("/signUp", validation(signUpSchema), signUp)
router.post("/signIn", validation(signInSchema), signIn)

// Endpoint to initiate password reset
router.post('/forgot-password', forgetPassword);

// Endpoint to render the password reset page
router.get('/reset-password/:token', changeResetPassword);

// Endpoint to handle password reset form submission
router.post('/reset-password/:token', resetPassword);


export default router