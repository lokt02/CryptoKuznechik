"use strict";
exports.__esModule = true;
exports.CTR = void 0;
var kuznec_1 = require("./kuznec");
var CTR = /** @class */ (function () {
    function CTR() {
        this.kuz = new kuznec_1.Kuznec();
        this.initv = Buffer.alloc(16);
        for (var i = 0; i < 16; i++) {
            this.initv[i] = Math.floor(Math.random() * 255);
        }
    }
    CTR.prototype.NewCTR = function (ctr, x) {
        var n = x;
        var arr = n.toString(16).replace(/\D/g, '0').split('').map(Number);
        while (arr.length != 8) {
            arr.unshift(0);
        }
        var temp = Buffer.from(arr);
        for (var i = 0; i < 8; ++i) {
            ctr[i + 8] += temp[i];
        }
        return ctr;
    };
    CTR.prototype.Encrypt = function (entstri) {
        var ctr = Buffer.alloc(16).fill(0);
        ctr = this.NewCTR(ctr, 0);
        var numbl = entstri.length / 16;
        var out = Buffer.alloc(entstri.length);
        for (var i = 0; i < numbl; ++i) {
            var temp = this.kuz.Encryption(ctr);
            for (var j = 0; j < 16; j++) {
                out[i * 16 + j] = temp[j] ^ entstri[i * 16 + j];
            }
            ctr = this.NewCTR(ctr, i + 1);
        }
        if (entstri.length % 16 != 0) {
            var temp = this.kuz.Encryption(ctr);
            for (var j = 0; j < 16; j++) {
                out[numbl * 16 + j] = temp[j] ^ entstri[numbl * 16 + j];
            }
        }
        return out;
    };
    CTR.prototype.Decrypt = function (entstri) {
        var ctr = Buffer.alloc(16).fill(0);
        ctr = this.NewCTR(ctr, 0);
        var numbl = entstri.length / 16;
        var out = Buffer.alloc(entstri.length);
        for (var i = 0; i < numbl; ++i) {
            var temp = this.kuz.Encryption(ctr);
            for (var j = 0; j < 16; j++) {
                out[i * 16 + j] = temp[j] ^ entstri[i * 16 + j];
            }
            ctr = this.NewCTR(ctr, i + 1);
        }
        if (entstri.length % 16 != 0) {
            var temp = this.kuz.Encryption(ctr);
            for (var j = 0; j < 16; j++) {
                out[numbl * 16 + j] = temp[j] ^ entstri[numbl * 16 + j];
            }
        }
        return out;
    };
    return CTR;
}());
exports.CTR = CTR;
