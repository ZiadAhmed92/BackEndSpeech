import express from "express"
import * as dotenv from "dotenv"
import cors from 'cors'
import { dbConnection } from "./database/dbConnection.js"
import router from "./src/modules/users/user.router.js"
import bodyParser from 'body-parser';
dotenv.config()
const app = express()
const port = process.env.PORT

dbConnection()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)






app.use((err, req, res, next) => {
    res.json({ err })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))