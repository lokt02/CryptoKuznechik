"use strict";
exports.__esModule = true;
exports.XOR = exports.Byte = void 0;
var Byte = /** @class */ (function () {
    function Byte(value) {
        var temp = value.toString(2);
        this.value = +temp;
    }
    Byte.prototype.GetValue = function () {
        return this.value;
    };
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
        return this.value.toString();
    };
    return Byte;
}());
exports.Byte = Byte;
function XOR(a, b) {
    var max = Math.max(a.GetValue(), b.GetValue()).toString().length;
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
