"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
// eslint-disable-next-line import/no-cycle
const post_entity_1 = require("./post.entity");
let User = class User extends typeorm_1.BaseEntity {
    constructor(payload) {
        super();
        this.comparePassword = (password, hashPassword) => bcrypt_1.default.compareSync(password, hashPassword);
        this.hidePassword = () => {
            this.hashPassword = undefined;
        };
        if (!(payload && payload.email && payload.password && payload.role && payload.username))
            return;
        this.email = payload.email;
        this.username = payload.username;
        // this.profilePicture = payload.profilePicturePath;
        this.role = payload.role;
        this.hashPassword = bcrypt_1.default.hashSync(payload.password, 10);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "hashPassword", void 0);
__decorate([
    typeorm_1.OneToMany(() => post_entity_1.Post, (post) => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    typeorm_1.Column({ default: 0 /* DEFAULT */ }),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
User = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], User);
exports.User = User;
