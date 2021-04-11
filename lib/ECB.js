"use strict";
exports.__esModule = true;
exports.ECB = void 0;
var kuznec_1 = require("./kuznec");
var ECB = /** @class */ (function () {
    function ECB() {
        this.kuz = new kuznec_1.Kuznec();
        this.kuz.KeyGen();
    }
    ECB.prototype.GetKeys = function () {
        return this.kuz.iterKey;
    };
    ECB.prototype.SetKeys = function (keys) {
        this.kuz.iterKey = keys;
        return this.kuz.iterKey;
    };
    ECB.prototype.Encrypt = function (inputString) {
        var block = [];
        for (var i = 0; i < inputString.length; i += 16) {
            block.push(inputString.slice(i, i + 16));
        }
        var encrypted = [];
        for (var i = 0; i < block.length; i++) {
            var buffer = Buffer.from(block[i], 'utf-8');
            encrypted.push(this.kuz.Encryption(buffer));
        }
        return encrypted;
    };
    ECB.prototype.Decrypt = function (encrypted) {
        var decrypted = [];
        for (var i = 0; i < encrypted.length; i++) {
            decrypted.push(this.kuz.Decryption(encrypted[i]));
        }
        var result = '';
        for (var i = 0; i < decrypted.length; i++) {
            result += decrypted[i].toString('utf-8');
        }
        result = result.split('\0').join('');
        return result;
    };
    return ECB;
}());
exports.ECB = ECB;
