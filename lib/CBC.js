"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CBC = void 0;
var kuznec_1 = require("./kuznec");
var CBC = /** @class */ (function () {
    function CBC() {
        this.kuz = new kuznec_1.Kuznec();
        this.initv = Buffer.alloc(16);
        for (var i = 0; i < 16; i++) {
            this.initv[i] = Math.floor(Math.random() * 255);
        }
    }
    CBC.prototype.GetKeys = function () {
        return this.kuz.iterKey;
    };
    CBC.prototype.SetKeys = function (keys) {
        this.kuz.iterKey = keys;
        return this.kuz.iterKey;
    };
    CBC.prototype.Encrypt = function (entstri) {
        var length = entstri.length % 16;
        entstri = Buffer.concat([entstri, Buffer.alloc(17 - length).fill(0)]);
        var numbl = Math.floor(entstri.length / 16);
        entstri[entstri.length - 1] = length;
        length = entstri.length % 16;
        numbl = entstri.length % 16 !== 0 ? (numbl + 1) : numbl;
        var out = Buffer.alloc(numbl * 16);
        var tempv = Buffer.from(this.initv);
        for (var j = 0; j < numbl; j++) {
            var len = entstri.length - 16 * j;
            if (len >= 16) {
                len = 16;
            }
            var temp = Buffer.alloc(len);
            for (var i = 0; i < len; i++) {
                temp[i] = entstri[j * 16 + i];
            }
            for (var i = 0; i < len; i++) {
                temp[i] = temp[i] ^ tempv[i];
            }
            temp = this.kuz.Encryption(temp);
            tempv = Buffer.from(temp);
            for (var i = 0; i < 16; i++) {
                out[16 * j + i] = temp[i];
            }
        }
        return out;
    };
    CBC.prototype.Decrypt = function (entstri) {
        var numbl = Math.floor(entstri.length / 16);
        var out = Buffer.alloc(entstri.length);
        var tempv = Buffer.from(this.initv);
        for (var j = 0; j < numbl; j++) {
            var temp = Buffer.alloc(16);
            var temp1 = Buffer.alloc(16);
            for (var i = 0; i < 16; i++) {
                temp[i] = entstri[j * 16 + i];
                temp1[i] = entstri[j * 16 + i];
            }
            temp = this.kuz.Decryption(temp);
            for (var i = 0; i < 16; i++) {
                temp[i] = temp[i] ^ tempv[i];
            }
            for (var i = 0; i < 16; i++) {
                out[16 * j + i] = temp[i];
            }
            tempv = Buffer.from(temp1);
        }
        out = out.slice(0, out.length + out[out.length - 16] - 32);
        return out;
    };
    return CBC;
}());
exports.CBC = CBC;
//# sourceMappingURL=CBC.js.map