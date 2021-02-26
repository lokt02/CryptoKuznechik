"use strict";
exports.__esModule = true;
exports.Kuznec = void 0;
var uint32 = require("uint32");
var constants = [1, 148, 32, 133, 16, 194,
    192, 1, 251, 1, 192, 194, 16, 133,
    32, 148];
function xorMult(value, multiplicator) {
    var result = 0;
    var tempVal = value.toString(2);
    var tempMult = multiplicator.toString(2);
    var temp = Math.max(tempVal.length, tempMult.length);
    while (tempVal.length < temp) {
        tempVal = "0" + tempVal;
        ;
    }
    while (tempMult.length < temp) {
        tempMult = "0" + tempMult;
        ;
    }
    for (var i = 0; i < temp; i++) {
        result += parseInt(uint32.xor(tempVal[i], tempMult[i])) * (Math.pow(2, i));
    }
    return result;
}
function BitPush(value, valueToPush) {
    value.slice(0, 1);
    value.unshift(valueToPush);
    return value;
}
var Kuznec = /** @class */ (function () {
    function Kuznec() {
    }
    ;
    Kuznec.prototype.L = function (value) {
        console.log(xorMult(6, 3));
        var hexValue = uint32.toHex(value, 2);
        var hexValues = [hexValue, '00', '00', '00', '00', '00', '00',
            '00', '00', '00', '00', '00', '00', '00', '00', '00'];
        var res = [];
        var val = 0;
        for (var j = 0; j < 16; j++) {
            for (var i = 15; i >= 0; i--) {
                val += xorMult(parseInt(hexValues[i]), constants[i]);
            }
            BitPush(res, uint32.toHex(val, 2));
            hexValues = res;
        }
        console.log(res);
        return hexValues;
    };
    return Kuznec;
}());
exports.Kuznec = Kuznec;
