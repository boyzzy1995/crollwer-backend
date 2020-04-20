"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(data, msg) {
    if (msg) {
        return {
            success: false,
            data: data,
            msg: msg,
        };
    }
    else {
        return {
            success: true,
            data: data,
        };
    }
}
exports.default = default_1;
