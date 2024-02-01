import multer from "multer"
import { v4 as uuidv4 } from 'uuid';

export const fileUpload = (fileName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      console.log(file.mimetype.startsWith("image"))
      cb(null, uuidv4() + '-' + file.originalname)
    }

  })

  function fileFilter(req, file, cb) {
    file.mimetype.startsWith("image") ? cb(null, true) : cb(null, false)
  }
  const upload = multer({ storage, fileFilter })

  return upload.single(fileName)
}