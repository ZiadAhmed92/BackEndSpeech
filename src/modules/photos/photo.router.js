import express from "express"
import { fileUpload } from "../../utils/fileUpload.js"
import { addPhoto, getPhoto } from "./photo.controller.js"

let photoRouter = express.Router()

photoRouter.post("/photo", fileUpload("path"), addPhoto)
photoRouter.get("/photo/:createdBy", getPhoto)


export default photoRouter