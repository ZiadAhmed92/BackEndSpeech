import { userModel } from "../../../database/model/user.model.js"
// import bcrypt from "bcrypt"
import { generateToken } from "../../utils/generateToken.js"
import { sendEmail } from "../../mails/mails.js"
import jwt from "jsonwebtoken"
import { handlingError } from "../../utils/handlingError.js"
import { createTransport } from "nodemailer";
import { htmlResetPassword } from "../../mails/template2.html.js"
import { template3 } from "../../mails/template3.html.js"
import { template4 } from "../../mails/tempalet4.html.js"

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
            if (user.confirmEmail == false) {
                sendEmail({ email, name: user.first_name }).then(() => { console.log("tmm") }).catch((e) => { console.log("error pro", e) })
                return res.json({ message: "Please Verify Email And Login Agin" })
            }

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
    const user = await userModel.findOne({ password })
    if (user) {

        await userModel.findOneAndUpdate({ _id }, { password: confirmPassword })
        res.json({ message: "success" })
    }
    res.json({ message: "Old Password Is Incorrect" })
})
let forgetPassword = handlingError(async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).send('User not found');
    }

    // // Generate a random token
    // const token = crypto.randomBytes(20).toString('hex');
    // user.resetToken = token;
    let token = jwt.sign({ email: email }, "resetPassword")
    // Create a Nodemailer transporter
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: "za693387@gmail.com",
            pass: "hhfj dpul rdgi lcco",
        },
    });


    // Send password reset email
    const mailOptions = {
        from: "Speech Emotion Recognition 👻",
        to: email,
        subject: 'Password Reset ✔',
        text: htmlResetPassword(token),
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Password reset email sent');
    });

})

let changeResetPassword = handlingError(async (req, res) => {
    const { token } = req.params;
    res.send(template3(token));
})

let resetPassword = handlingError(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    jwt.verify(token, "resetPassword", async (err, decode) => {

        if (err) return res.json({ message: err })

        let user = await userModel.findOne({ email: decode.email });
        if (!user) {
            return res.status(404).send('Email Not Found');
        }
        // Update the user's password and clear the resetToken
        await userModel.findOneAndUpdate({ email: decode.email }, { password})

        res.status(200).send(template4());

    })
})

export {
    signUp,
    signIn,
    getAllUser,
    verifyEmail,
    deleteUser,
    updateUser,
    changePassword,
    resetPassword,
    changeResetPassword,
    forgetPassword
}