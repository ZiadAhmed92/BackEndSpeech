
import mongoose from "mongoose";

let photoSchema = mongoose.Schema({
  path: {
    type: String
  },
  createdBy: {
    type: String,
    ref: "user"
  }

}, { timestamps: true })

export const photoModel = mongoose.model('photo', photoSchema)