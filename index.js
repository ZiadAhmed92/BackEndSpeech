import express from "express"
import * as dotenv from "dotenv"
import cors from 'cors'
import { dbConnection } from "./database/dbConnection.js"
import router from "./src/modules/users/user.router.js"
import bodyParser from 'body-parser';
import photoRouter from "./src/modules/photos/photo.router.js"
dotenv.config()
const app = express()
const port = process.env.PORT

dbConnection()
app.use(cors())
app.use(express.json())
// عشان النود تعرف تتعامل مع ال files Static
app.use(express.static("uploads"))
app.use( photoRouter)

// عشان تغير ال password
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)






app.use((err, req, res, next) => {
    res.json({ err })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))