import multer from "multer";
import crypto from "crypto";
import sharp from "sharp";
import { image_location, ktp_location } from "../configs/index.js";

const filename = (request, file, callback) => {
  let customFileName =
      request.body.name.toLowerCase().split(" ").join("_") +
      "_" +
      crypto.randomBytes(4).toString("hex"),
    fileExtension =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
  callback(null, customFileName + "." + fileExtension);
};

export const compress = async (path) => {
  await sharp(path)
    .toBuffer()
    .then(async (data) => {
      await sharp(data)
        .jpeg({
          quality: 80,
        })
        .toFile(path);
    });
};

export const uploadImages = multer({
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, image_location);
    },
    filename,
  }),
}).single("image");

export const uploadKtp = multer({
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, ktp_location);
    },
    filename,
  }),
}).single("ktp");
