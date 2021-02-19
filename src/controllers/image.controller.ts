import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { getRepository } from 'typeorm';
import { ArticleImage } from '../models/image.entity';
import { LOGGER } from '../util/logger';

let newFileName: string = '';
let newFileId: number = -1;

function generateFileName(file: Express.Multer.File): string {
  newFileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
  return newFileName;
}
// Storage Engine
const storage = multer.diskStorage({
  destination(req: Request, file, cb) {
    cb(null, './public/upload');
  },
  filename(req: Request, file, cb) {
    cb(null, generateFileName(file));
  },
});

function checkFileType(file: Express.Multer.File, callback: multer.FileFilterCallback) {
  const fileTypes = /jpeg|jpg|png|gif|/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return callback(null, true);
  }

  return callback(new Error('Error: Only images of type: jpeg/pjg/png/gif are allowed.'));
}

// Init upload
// <form enctype = 'multipart/form-data'>
// <input name = 'myImage'>
const uploader = multer({
  storage,
  limits: { fileSize: 5000000 }, // Max. ~= 5 Mo
  fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
    checkFileType(file, callback);
  },
}).single('myImage');

export async function upload(req: Request, res: Response): Promise<number | null> {
  uploader(req, res, async (err: any) => {
    if (err) throw new Error(`error while uploading the file:\n${err}`);
    else {
      if (req.file === undefined) res.send({ msg: 'Error: no file selected' });
      const newImage = new ArticleImage(newFileName); // try with req.file.filename
      await getRepository(ArticleImage).save(newImage);
      newFileId = newImage.id;
      res.redirect(`/image/${newFileId}`);
    }
  });
  return newFileId !== -1 ? newFileId : null;
}

export async function get(req: Request, res: Response, id: string) {
  const img = await getRepository(ArticleImage).findOne(+id);
  if (img === undefined) {
    LOGGER.error(`Image with id: ${id} not found`);
    return;
  }
  res.sendFile(
    img.filename,
    { root: 'public/upload/' },
    (err: Error) => {
      if (err) LOGGER.error(`Error when sending the file: ${err}`);
    },
  );
}
