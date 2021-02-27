"use strict";
exports.__esModule = true;
exports.Kuznec = void 0;
var uint32 = require("uint32");
var polynom_1 = require("./polynom");
var constants = [1, 148, 32, 133, 16, 194,
    192, 1, 251, 1, 192, 194, 16, 133,
    32, 148];
function GaloisMult(value, multiplicator) {
    // let result:number = 0;
    var tempVal = value.toString(2);
    var tempMult = multiplicator.toString(2);
    // console.log(tempVal, tempMult);
    var pol1 = new polynom_1.Polynom(0, []);
    var pol2 = new polynom_1.Polynom(0, []);
    for (var i = 0; i < tempVal.length; i++) {
        pol1.koef.push(parseInt(tempVal[i]));
    }
    for (var i = 0; i < tempMult.length; i++) {
        pol2.koef.push(parseInt(tempMult[i]));
    }
    var result = pol1.Mult(pol2);
    var res = 0;
    for (var i = 0; i < result.koef.length; i++) {
        result.koef[i] = result.koef[i] % 2;
    }
    result = result.Mod(new polynom_1.Polynom(0, [1, 1, 1, 0, 0, 0, 0, 1, 1]));
    for (var i = 0; i < result.koef.length; i++) {
        res += result.koef[i] * Math.pow(2, (result.koef.length - 1 - i));
    }
    // if(res > 255){
    //     res = uint32.xor(res, 195);
    // }
    return res;
}
function BitPush(value, valueToPush) {
    value.slice(0, 1);
    value.push(valueToPush);
    return value;
}
var Kuznec = /** @class */ (function () {
    function Kuznec() {
    }
    ;
    Kuznec.prototype.L = function (value) {
        console.log(GaloisMult(1, 148).toString(16));
        var hexValue = uint32.toHex(value, 2);
        var hexValues = ["0x" + hexValue, '0x00', '0x00', '0x00', '0x00', '0x00', '0x00',
            '0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00'];
        var res = [];
        var val = 0;
        for (var j = 0; j < 16; j++) {
            val = 0;
            for (var i = 0; i <= 15; i++) {
                var temp = parseInt(hexValues[i], 16);
                if (isNaN(temp)) {
                    temp = 0;
                }
                if (temp == 1 && constants[i] == 148) {
                    console.log(i, j, val);
                }
                val += GaloisMult(temp, constants[i]);
                // if(val === 2){
                //     console.log(i, j, hexValues[i], constants[i], val, GaloisMult(parseInt(hexValues[i], 16), constants[i]));
                // }
            }
            var strVal = (val % 255).toString(16);
            if (strVal.length < 2) {
                strVal = "0" + strVal;
            }
            res = BitPush(res, "0x" + strVal);
            hexValues = res;
        }
        console.log(res);
        return hexValues;
    };
    return Kuznec;
}());
exports.Kuznec = Kuznec;
