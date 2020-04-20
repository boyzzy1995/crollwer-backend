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
var decorator_1 = require("../decorator");
var util_1 = __importDefault(require("../utils/util"));
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.login = function (req, res) {
        var password = req.body.password;
        var isLogin = Boolean(req.session ? req.session.login : false);
        if (isLogin) {
            res.json(util_1.default(true));
        }
        else {
            if (password === '123' && req.session) {
                req.session.login = true;
                res.json(util_1.default(true));
            }
            else {
                res.json(util_1.default(false, '密码错误'));
            }
        }
    };
    LoginController.prototype.isLogin = function (req, res) {
        var isLogin = Boolean(req.session ? req.session.login : false);
        var result = util_1.default(isLogin);
        res.json(result);
    };
    LoginController.prototype.logout = function (req, res) {
        req.session && (req.session.login = undefined);
        res.json(util_1.default(false));
    };
    __decorate([
        decorator_1.post('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "login", null);
    __decorate([
        decorator_1.get('/isLogin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "isLogin", null);
    __decorate([
        decorator_1.post('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logout", null);
    LoginController = __decorate([
        decorator_1.controller('/api')
    ], LoginController);
    return LoginController;
}());
exports.LoginController = LoginController;
