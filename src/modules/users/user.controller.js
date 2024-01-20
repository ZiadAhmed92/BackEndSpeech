import { userModel } from "../../../database/model/user.model.js"
// import bcrypt from "bcrypt"
import { generateToken } from "../../utils/generateToken.js"
import { sendEmail } from "../../mails/mails.js"
import jwt from "jsonwebtoken"
import { handlingError } from "../../utils/handlingError.js"

let signUp = handlingError(async (req, res) => {
    const { first_name, last_name, gender, birthday, phone, email, password } = req.body

    const user = await userModel.findOne({ email })

    if (user) return res.json({ message: "Email Is Already Exist" })

    // bcrypt.hash(password, 8, async function (err, hash) {
    // if (err) return console.log(err)
    await userModel.insertMany({ first_name, last_name, birthday, gender, phone, email, password })
    res.json({ message: "success" })
    // });


})


let signIn = handlingError(async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (user) {
        // const match = await bcrypt.compare(password, user.password);
        if (password == user.password) {
            if (user.confirmEmail == false) return res.json({ message: "Please Verify Email And Login Agin" })
            sendEmail({ email, name: user.first_name }).then(() => { console.log("tmm") }).catch((e) => { console.log("error pro", e) })

            let token = generateToken({ _id: user._id, email: user.email, phone: user.phone, first_name: user.first_name, birthday: user.birthday, gender: user.gender })

            res.json({ message: "login", token })
        } else {
            res.json({ message: "Password Not Valid" })
        }
    } else {
        res.json({ message: "Email Not Found" })
    }

    // const hash = await bcrypt.compare(password, user.password);


})

let getAllUser = handlingError(async (req, res) => {

    const user = await userModel.find()
    res.json({ message: "success", users: user })
})
let deleteUser = handlingError(async (req, res) => {
    const { _id } = req.params
    await userModel.findOneAndDelete({ _id })
    res.json({ message: "success" })
})

let verifyEmail = handlingError(async (req, res) => {
    const { token } = req.params
    jwt.verify(token, "verifyEmail", async (err, decode) => {

        if (err) return res.json({ message: err })

        await userModel.findOneAndUpdate({ email: decode.email }, { confirmEmail: true })
        res.json({ message: "success" })

    })

})
let updateUser = handlingError(async (req, res) => {
    const { _id, first_name, last_name, gender, birthday, phone } = req.body

    let user = await userModel.findOneAndUpdate({ _id }, { first_name, last_name, gender, birthday, phone })

    res.json({ message: "success", user })


})
let changePassword = handlingError(async (req, res) => {
    // const { first_name, last_name, gender, birthday, phone, email, password } = req.body
    const { _id, password, confirmPassword } = req.body
    if (password !== confirmPassword) return res.json({ message: "Confirm the password is incorrect" })
    let user = await userModel.findOneAndUpdate({ _id }, { password })

    res.json({ message: "success" })

})


export {
    signUp,
    signIn,
    getAllUser,
    verifyEmail,
    deleteUser,
    updateUser,
    changePassword
}