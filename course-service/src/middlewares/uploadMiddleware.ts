import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import sharp from "sharp";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const uniqueSuffix = uuidv4();
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Разрешены только изображения"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const uploadImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    next();
  });
};

export const saveImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    next();
    return;
  }

  const filePath = path.join(__dirname, "../../images", req.file.filename);
  const newFilePath = path.join(__dirname, "../../images", uuidv4() + ".jpg");
  const watermarkPath = path.join(__dirname, "../../watermark.jpg");

  try {
    if (!fs.existsSync(watermarkPath)) {
      console.error("Файл водяного знака не найден.");
      fs.unlinkSync(filePath);
      next();
    }

    await sharp(filePath)
      .resize({ width: 800 })
      .composite([{ input: "watermark.jpg", gravity: "southwest" }])
      .jpeg({ quality: 70 })
      .toFile(newFilePath);

    req.body.image = newFilePath;
    fs.unlinkSync(filePath)
    next();
  } catch (error) {
    fs.unlinkSync(filePath);
    next(error);
  }
};