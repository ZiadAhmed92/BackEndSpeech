import { photoModel } from "../../../database/model/photo.model.js"
import { handlingError } from "../../utils/handlingError.js"

export const addPhoto = async (req, res) => {
  const { createdBy } = req.body

  if (!req.file) return res.json({ message: "Please Upload Image" })
  let photo = await photoModel.findOne({ createdBy })

  if (photo) {
    await photoModel.findByIdAndDelete({ _id: photo._id })
    await photoModel.insertMany({ path: req.file.filename, createdBy })
    res.json({ message: "success" })
  } else {
    await photoModel.insertMany({ path: req.file.filename, createdBy })
    res.json({ message: "success" })
  }



}
export const getPhoto = handlingError(async (req, res) => {
  const { createdBy } = req.params
  console.log(createdBy)
  let photo = await photoModel.findOne({ createdBy })
  console.log(photo)
  if (photo) return res.json({ message: "success", photo })

  res.json({ message: "Photo Not Found" })
})