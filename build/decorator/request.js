"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var methods_1 = require("../enum/methods");
function generateRequest(method) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', method, target, key);
        };
    };
}
exports.generateRequest = generateRequest;
exports.get = generateRequest(methods_1.Methods.get);
exports.post = generateRequest(methods_1.Methods.post);
