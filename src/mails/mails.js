import { createTransport } from "nodemailer";
import { templateHtml } from "./template.html.js";
import jwt from "jsonwebtoken";
export async function sendEmail(option) {
    let token = jwt.sign({ email: option.email, name: option.name }, process.env.VERIFY_EMAIL)

    const transporter = createTransport({
        service: "gmail",
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "za693387@gmail.com",
            pass: "hhfj dpul rdgi lcco",
        },
    });
    // async..await is not allowed in global scope, must use a wrapper

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Speech Emotion Recognition 👻" <za693387@gmail.com>', // sender address
        to: option.email, // list of receivers
        subject: `Hello ${option.name} ✔`, // Subject line
        html: templateHtml(token), // html body
    })
    console.log(info)
};