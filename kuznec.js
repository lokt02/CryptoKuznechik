"use strict";
exports.__esModule = true;
exports.Kuznec = void 0;
var uint32 = require("uint32");
var polynom_1 = require("./polynom");
var constants = [1, 148, 32, 133, 16, 194,
    192, 1, 251, 1, 192, 194, 16, 133,
    32, 148];
// let powerOfTwo = {};
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
// function Rebuild(array:number[], elNum: number){
//     return ;
// }
var Kuznec = /** @class */ (function () {
    function Kuznec() {
    }
    ;
    Kuznec.prototype.L = function (bytes) {
        console.log(GaloisMult(1, 1));
        console.log(GaloisMult(1, 148));
        console.log(GaloisMult(148, 148));
        console.log(GaloisMult(1, 32));
        console.log(uint32.xor(GaloisMult(148, 148), GaloisMult(1, 32)));
        console.log(uint32.xor(GaloisMult(1, 148), GaloisMult(1, 1)));
        while (bytes.length < 16) {
            bytes.push(0);
        }
        var result = [];
        for (var j = 0; j < 16; j++) {
            var value = 0;
            for (var i = 0; i < bytes.length; i++) {
                //if(constants[i] === undefined) {console.log(constants, i, bytes); return;}
                value = (value ^ GaloisMult(bytes[i], constants[i])) % 255;
                // if(value < 0 || value > 500) console.log(bytes[i], constants[i]);
                //console.log(result[j], bytes[i], constants[i], GaloisMult(bytes[i], constants[i]));
            }
            result.push(value);
            bytes = polynom_1.CopyMas(result);
            while (bytes.length < 16) {
                bytes.unshift(0);
            }
            //console.log("##########################");
        }
        return result;
    };
    return Kuznec;
}());
exports.Kuznec = Kuznec;
