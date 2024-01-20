import express from "express"
import { changePassword, deleteUser, getAllUser, signIn, signUp, updateUser, verifyEmail } from "./user.controller.js"
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

export default router