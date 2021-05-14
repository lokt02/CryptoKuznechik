"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECB = void 0;
var kuznec_1 = require("./kuznec");
var ECB = /** @class */ (function () {
    function ECB() {
        this.kuz = new kuznec_1.Kuznec();
    }
    ECB.prototype.GetKeys = function () {
        return this.kuz.iterKey;
    };
    ECB.prototype.SetKeys = function (keys) {
        this.kuz.iterKey = keys;
        return this.kuz.iterKey;
    };
    ECB.prototype.Encrypt = function (input) {
        var numbl = Math.floor(input.length / 16);
        var out = Buffer.alloc((numbl + 1) * 16);
        for (var i = 0; i < numbl; i++) {
            var temp = Buffer.alloc(16);
            temp = this.kuz.Encryption(input.slice(i * 16, i * 16 + 16));
            for (var j = 0; j < 16; j++) {
                out[16 * i + j] = temp[j];
            }
        }
        if (input.length % 16 != 0) {
            var temp = Buffer.alloc(16);
            temp = this.kuz.Encryption(input.slice(numbl * 16, numbl * 16 + input.length % 16));
            for (var j = 0; j < 16; j++) {
                out[16 * numbl + j] = temp[j];
            }
        }
        return out;
    };
    ECB.prototype.Decrypt = function (encrypted) {
        var decrypted = Buffer.alloc(encrypted.length);
        var numbl = encrypted.length / 16;
        // for(let i = 0; i < encrypted.length; i++){
        //     decrypted.push(this.kuz.Decryption(encrypted[i]));
        // }
        for (var i = 0; i < numbl; i++) {
            var temp = Buffer.alloc(16);
            temp = this.kuz.Decryption(encrypted.slice(i * 16, i * 16 + 16));
            for (var j = 0; j < 16; j++) {
                decrypted[16 * i + j] = temp[j];
            }
        }
        return decrypted;
    };
    return ECB;
}());
exports.ECB = ECB;
//# sourceMappingURL=ECB.js.map