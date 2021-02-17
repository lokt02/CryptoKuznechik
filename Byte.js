"use strict";
exports.__esModule = true;
exports.XOR = exports.Byte = void 0;
var Byte = /** @class */ (function () {
    function Byte(value, size) {
        this.size = 0;
        var temp = value.toString(2);
        if (size === null || size < temp.length) {
            this.size = temp.length;
        }
        else {
            this.size = size;
        }
        var dsize = size - temp.length;
        for (var i = 0; i < dsize; i++) {
            temp = '0' + temp;
        }
        this.value = temp;
    }
    Byte.prototype.GetValueDec = function () {
        // let temp: string = this.value.toString(10);
        // return +temp;
        var temp = this.value.toString();
        var result = 0;
        for (var i = 0; i < temp.length; i++) {
            result += +temp[i] * Math.pow(2, temp.length - 1 - i);
        }
        return result;
    };
    Byte.prototype.GetValueString = function () {
        return this.value;
    };
    return Byte;
}());
exports.Byte = Byte;
function XOR(a, b) {
    var max = Math.max(a.size, b.size);
    var result = "";
    for (var i = 0; i < max; i++) {
        var temp = void 0;
        temp = +a.GetValueString()[i] + +b.GetValueString()[i];
        temp = temp % 2;
        result += temp;
    }
    return result;
}
exports.XOR = XOR;
