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
const post_entity_1 = require("../models/post.entity");
const user_entity_1 = require("../models/user.entity");
// import { PostImage } from '../models/image.entity';
function assignValues(post, values) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = post;
        const owner = yield typeorm_1.getRepository(user_entity_1.User).findOne({ email: values.userEmail });
        if (!owner)
            throw new Error(`User "${values.userEmail} not found"`);
        newPost.text = values.text;
        newPost.user = owner;
        return newPost;
    });
}
function index(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = yield typeorm_1.getRepository(post_entity_1.Post).find({ relations: ['user'] });
        // Remapping the result to avoid sending hash passwords to clients
        res.json(posts.map((post) => ({
            id: post.id,
            text: post.text,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            ownerName: post.user.username,
        })));
    });
}
exports.index = index;
function show(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(yield typeorm_1.getRepository(post_entity_1.Post).findOne(+id));
    });
}
exports.show = show;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // req.user should be defined thx to login controller used as middleware
        const newPost = yield assignValues(new post_entity_1.Post(), Object.assign(Object.assign({}, req.body), { email: req.user.email }));
        yield typeorm_1.getRepository(post_entity_1.Post).save(newPost);
        res.json(newPost);
    });
}
exports.create = create;
function edit(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = typeorm_1.getRepository(post_entity_1.Post);
        const postToUpdate = yield repo.findOne(+id);
        if (postToUpdate === undefined)
            throw Error(`Post with id "${id}" not found.`);
        res.json(yield repo.save(yield assignValues(postToUpdate, req.body)));
    });
}
exports.edit = edit;
function remove(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(yield typeorm_1.getRepository(post_entity_1.Post).delete(+id));
    });
}
exports.remove = remove;
