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
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.edit = exports.create = exports.show = exports.index = void 0;
const typeorm_1 = require("typeorm");
const article_entity_1 = require("../models/article.entity");
// import { ArticleImage } from '../models/image.entity';
function assignValues(article, values) {
    const newArticle = article;
    newArticle.text = values.text;
    return newArticle;
}
function index(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // res.json(await getRepository(Article).find({ relations: ['image'] }));
        res.json(yield typeorm_1.getRepository(article_entity_1.Article).find());
    });
}
exports.index = index;
function show(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        // res.json(await getRepository(Article).findOne(+id, { relations: ['image'] }));
        res.json(yield typeorm_1.getRepository(article_entity_1.Article).findOne(+id));
    });
}
exports.show = show;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newArticle = assignValues(new article_entity_1.Article(), req.body);
        yield typeorm_1.getRepository(article_entity_1.Article).save(newArticle);
        res.json(newArticle);
    });
}
exports.create = create;
function edit(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = typeorm_1.getRepository(article_entity_1.Article);
        const articleToUpdate = yield repo.findOne(+id);
        if (articleToUpdate === undefined)
            throw Error(`User with id "${id}" not found.`);
        res.json(yield repo.save(assignValues(articleToUpdate, req.body)));
    });
}
exports.edit = edit;
function remove(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(yield typeorm_1.getRepository(article_entity_1.Article).delete(+id));
    });
}
exports.remove = remove;
