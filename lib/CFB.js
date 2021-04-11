"use strict";
exports.__esModule = true;
exports.CFB = void 0;
var kuznec_1 = require("./kuznec");
var CFB = /** @class */ (function () {
    function CFB() {
        this.kuz = new kuznec_1.Kuznec();
        this.initv = Buffer.alloc(16);
        for (var i = 0; i < 16; i++) {
            this.initv[i] = Math.floor(Math.random() * 255);
        }
    }
    CFB.prototype.Encrypt = function (entstri) {
        this.kuz.KeyGen();
        var ctr = Buffer.alloc(this.initv.length);
        var numbl = entstri.length / 16;
        var gamma = Buffer.alloc(16);
        var out = Buffer.alloc(entstri.length);
        ctr = this.initv.slice();
        for (var i = 0; i < numbl; i++) {
            gamma = this.kuz.Encryption(ctr);
            var temp = Buffer.alloc(16);
            for (var j = 0; j < 16; j++) {
                out[16 * i + j] = gamma[j] ^ entstri[16 * i + j];
                temp[j] = out[16 * i + j];
            }
            ctr = temp.slice();
        }
        if (entstri.length % 16 != 0) {
            gamma = this.kuz.Encryption(ctr);
            for (var j = 0; j < entstri.length % 16; j++) {
                out[16 * numbl + j] = gamma[j] ^ entstri[16 * numbl + j];
            }
        }
        return out;
    };
    CFB.prototype.Decrypt = function (out) {
        var ctr = Buffer.alloc(this.initv.length);
        ctr = this.initv.slice();
        var numbl = out.length / 16;
        var dec = Buffer.alloc(out.length);
        var gamma = Buffer.alloc(16);
        for (var i = 0; i < numbl; i++) {
            gamma = this.kuz.Encryption(ctr);
            var temp = Buffer.alloc(16);
            for (var j = 0; j < 16; j++) {
                dec[16 * i + j] = gamma[j] ^ out[16 * i + j];
                temp[j] = out[16 * i + j];
            }
            ctr = temp.slice();
        }
        if (out.length % 16 != 0) {
            gamma = this.kuz.Encryption(ctr);
            for (var j = 0; j < out.length % 16; j++) {
                dec[16 * numbl + j] = gamma[j] ^ out[16 * numbl + j];
            }
        }
        return dec;
    };
    return CFB;
}());
exports.CFB = CFB;
