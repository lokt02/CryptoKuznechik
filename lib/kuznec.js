"use strict";
exports.__esModule = true;
exports.HexInput = exports.Kuznec = void 0;
var tabl_notlin = Buffer.from([
    252, 238, 221, 17, 207, 110, 49, 22, 251, 196, 250, 218, 35, 197, 4,
    77, 233, 119, 240, 219, 147, 46, 153, 186, 23, 54, 241, 187, 20, 205,
    95, 193, 249, 24, 101, 90, 226, 92, 239, 33, 129, 28, 60, 66, 139, 1,
    142, 79, 5, 132, 2, 174, 227, 106, 143, 160, 6, 11, 237, 152, 127, 212,
    211, 31, 235, 52, 44, 81, 234, 200, 72, 171, 242, 42, 104, 162, 253, 58,
    206, 204, 181, 112, 14, 86, 8, 12, 118, 18, 191, 114, 19, 71, 156, 183,
    93, 135, 21, 161, 150, 41, 16, 123, 154, 199, 243, 145, 120, 111, 157,
    158, 178, 177, 50, 117, 25, 61, 255, 53, 138, 126, 109, 84, 198, 128, 195,
    189, 13, 87, 223, 245, 36, 169, 62, 168, 67, 201, 215, 121, 214, 246, 124,
    34, 185, 3, 224, 15, 236, 222, 122, 148, 176, 188, 220, 232, 40, 80, 78,
    51, 10, 74, 167, 151, 96, 115, 30, 0, 98, 68, 26, 184, 56, 130, 100, 159,
    38, 65, 173, 69, 70, 146, 39, 94, 85, 47, 140, 163, 165, 125, 105, 213,
    149, 59, 7, 88, 179, 64, 134, 172, 29, 247, 48, 55, 107, 228, 136, 217,
    231, 137, 225, 27, 131, 73, 76, 63, 248, 254, 141, 83, 170, 144, 202, 216,
    133, 97, 32, 113, 103, 164, 45, 43, 9, 91, 203, 155, 37, 208, 190, 229,
    108, 82, 89, 166, 116, 210, 230, 244, 180, 192, 209, 102, 175, 194, 57, 75, 99, 182
]);
var constants1 = Buffer.from([148, 32, 133, 16, 194, 192, 1, 251,
    1, 192, 194, 16, 133, 32, 148, 1]);
var Kuznec = /** @class */ (function () {
    function Kuznec() {
        this.iterKey = [];
        this.C = [];
        this.KeyGen();
    }
    ;
    Kuznec.prototype.GaloisMult = function (value1, value2) {
        var gm = 0;
        var hi_bit;
        for (var i = 0; i < 8; i++) {
            if (value2 & 1) {
                gm ^= value1;
            }
            hi_bit = value1 & 0x80;
            value1 <<= 1;
            if (hi_bit) {
                value1 ^= 0xc3;
            }
            value2 >>= 1;
        }
        return gm;
    };
    Kuznec.prototype.XSL = function (plaintext, j) {
        plaintext = this.XOR(plaintext, this.iterKey[j]);
        plaintext = this.S(plaintext);
        plaintext = this.L(plaintext);
        return plaintext;
    };
    Kuznec.prototype.LrSrX = function (cipherText, j) {
        cipherText = this.L_rev(cipherText);
        cipherText = this.S_rev(cipherText);
        cipherText = this.XOR(cipherText, this.iterKey[j]);
        return cipherText;
    };
    Kuznec.prototype.Decryption = function (cipherText) {
        cipherText = this.XOR(cipherText, this.iterKey[this.iterKey.length - 1]);
        for (var i = this.iterKey.length - 2; i >= 0; i--) {
            cipherText = this.LrSrX(cipherText, i);
        }
        return cipherText;
    };
    Kuznec.prototype.XOR = function (a, b) {
        var result = Buffer.alloc(16);
        for (var i = 0; i < 16; i++) {
            result[i] = a[i] ^ b[i];
        }
        return result;
    };
    Kuznec.prototype.Encryption = function (plaintext) {
        for (var i = 0; i < this.iterKey.length - 1; i++) {
            plaintext = this.XSL(plaintext, i);
        }
        plaintext = this.XOR(plaintext, this.iterKey[this.iterKey.length - 1]);
        return plaintext;
    };
    Kuznec.prototype.ConstGen = function () {
        this.C = [];
        for (var i = 1; i <= 32; i++) {
            var z = i;
            var m = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            m[15] = z;
            this.C.push(this.L(m));
        }
        return this.C;
    };
    Kuznec.prototype.GOSTF = function (key1, key2, iter_const) {
        var internal = Buffer.alloc(0);
        var outKey2 = key1;
        internal = this.XOR(key1, iter_const);
        internal = this.S(internal);
        internal = this.L(internal);
        var outKey1 = Buffer.alloc(0);
        outKey1 = this.XOR(internal, key2);
        var key = [];
        key.push(outKey1);
        key.push(outKey2);
        return key;
    };
    Kuznec.prototype.KeyGen = function () {
        var temp = [];
        for (var i = 0; i < 32; ++i) {
            temp.push(Math.floor(Math.random() * 255));
        }
        this.GetKeys(Buffer.from(temp));
    };
    Kuznec.prototype.GetKeys = function (masterkey) {
        var key1 = Buffer.alloc(16);
        var key2 = Buffer.alloc(16);
        for (var i_1 = 0; i_1 < 16; i_1++) {
            key1[i_1] = masterkey[i_1];
        }
        for (var i_2 = 16; i_2 < 32; i_2++) {
            key2[i_2 - 16] = masterkey[i_2];
        }
        var i;
        var iter12 = [Buffer.alloc(0), Buffer.alloc(0)];
        var iter34 = [Buffer.alloc(0), Buffer.alloc(0)];
        this.ConstGen();
        this.iterKey[0] = key1;
        this.iterKey[1] = key2;
        iter12[0] = key1;
        iter12[1] = key2;
        for (i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j += 2) {
                iter34 = this.GOSTF(iter12[0], iter12[1], this.C[j + 8 * i]);
                iter12 = this.GOSTF(iter34[0], iter34[1], this.C[j + 1 + 8 * i]);
            }
            this.iterKey[2 * i + 2] = iter12[0];
            this.iterKey[2 * i + 3] = iter12[1];
        }
        return this.iterKey;
    };
    Kuznec.prototype.GOSTR = function (bytes) {
        var r = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        var a15 = 0;
        for (var i = 15; i >= 1; i--) {
            r[i] = bytes[i - 1];
        }
        for (var i = 0; i < 16; i++) {
            a15 ^= this.GaloisMult(constants1[i], bytes[i]);
        }
        r[0] = a15;
        return r;
    };
    Kuznec.prototype.L = function (bytes) {
        var result = bytes.slice();
        for (var i = 0; i < 16; i++) {
            result = this.GOSTR(result);
        }
        return result;
    };
    Kuznec.prototype.S = function (bytes) {
        var result = Buffer.alloc(0);
        for (var i = 0; i < bytes.length; i++) {
            result = Buffer.concat([result, Buffer.from([tabl_notlin[bytes[i]]])]);
        }
        while (result.length < 16) {
            result = Buffer.concat([Buffer.from([0]), result]);
        }
        return result;
    };
    Kuznec.prototype.GOSTR_rev = function (a) {
        var a_0;
        a_0 = 0;
        var r_inv = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0]);
        for (var i = 0; i < 15; i++) {
            r_inv[i] = a[i + 1];
        }
        a_0 = a[0];
        for (var i = 0; i < 15; i++) {
            a_0 ^= this.GaloisMult(a[i + 1], constants1[i]);
        }
        r_inv[15] = a_0;
        return r_inv;
    };
    Kuznec.prototype.L_rev = function (bytes) {
        var res = bytes.slice();
        for (var j = 0; j < 16; j++) {
            res = this.GOSTR_rev(res);
        }
        return res;
    };
    Kuznec.prototype.S_rev = function (bytes) {
        while (bytes.length < 16) {
            bytes = Buffer.concat([bytes, Buffer.from([0])]);
        }
        var result = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        for (var i = 0; i < 16; i++) {
            result[i] = tabl_notlin.indexOf(bytes[i]);
        }
        return result;
    };
    return Kuznec;
}());
exports.Kuznec = Kuznec;
function HexInput(byte) {
    return (Buffer.from(byte.replace(/\s+/g, ''), 'hex'));
}
exports.HexInput = HexInput;
