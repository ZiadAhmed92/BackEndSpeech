import jwt from "jsonwebtoken"

export const authToken = (req, res, next) => {
    let token = req.header('token')
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {

        if (err) return res.json({ message: err })

        req._id = decode._id
        next()

    })


}