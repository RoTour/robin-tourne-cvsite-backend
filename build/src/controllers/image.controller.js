"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const image_entity_1 = require("../models/image.entity");
const logger_1 = require("../util/logger");
let newFileName = '';
let newFileId = -1;
function generateFileName(file) {
    newFileName = `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`;
    return newFileName;
}
// Storage Engine
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, './public/upload');
    },
    filename(req, file, cb) {
        cb(null, generateFileName(file));
    },
});
function checkFileType(file, callback) {
    const fileTypes = /jpeg|jpg|png|gif|/;
    const extname = fileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
        return callback(null, true);
    }
    return callback(new Error('Error: Only images of type: jpeg/pjg/png/gif are allowed.'));
}
// Init upload
// <form enctype = 'multipart/form-data'>
// <input name = 'myImage'>
const uploader = multer_1.default({
    storage,
    limits: { fileSize: 5000000 },
    fileFilter(req, file, callback) {
        checkFileType(file, callback);
    },
}).single('myImage');
function upload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        uploader(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                throw new Error(`error while uploading the file:\n${err}`);
            else {
                if (req.file === undefined)
                    res.send({ msg: 'Error: no file selected' });
                const newImage = new image_entity_1.ArticleImage(newFileName); // try with req.file.filename
                yield typeorm_1.getRepository(image_entity_1.ArticleImage).save(newImage);
                newFileId = newImage.id;
                res.redirect(`/image/${newFileId}`);
            }
        }));
        return newFileId !== -1 ? newFileId : null;
    });
}
exports.upload = upload;
function get(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const img = yield typeorm_1.getRepository(image_entity_1.ArticleImage).findOne(+id);
        if (img === undefined) {
            logger_1.LOGGER.error(`Image with id: ${id} not found`);
            return;
        }
        res.sendFile(img.filename, { root: 'public/upload/' }, (err) => {
            if (err)
                logger_1.LOGGER.error(`Error when sending the file: ${err}`);
        });
    });
}
exports.get = get;
