"use strict";
exports.__esModule = true;
exports.Kuznec = void 0;
var uint32 = require("uint32");
var polynom_1 = require("./polynom");
var Tabl1_1 = require("./Tabl1");
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
    // console.log(result.koef)
    result = result.Mod(new polynom_1.Polynom(0, [1, 1, 1, 0, 0, 0, 0, 1, 1]));
    // console.log(result.koef)
    // console.log('##########')
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
function GaloisMultTabl(value1, value2) {
    if (value1 === 0 || value2 === 0)
        return 0;
    var p1 = Tabl1_1.tab1.indexOf(value1);
    var p2 = Tabl1_1.tab1.indexOf(value2);
    // console.log(p1, p2);
    // console.log((p1 + p2));
    // console.log((p1 + p2) % tab1.length);
    // console.log(tab1[(p1 + p2) % tab1.length]);
    var gm = Tabl1_1.tab1[(p1 + p2) % Tabl1_1.tab1.length];
    return gm;
}
var Kuznec = /** @class */ (function () {
    function Kuznec() {
    }
    ;
    Kuznec.prototype.L = function (bytes) {
        // console.log(GaloisMultTabl(0, 148)); return;
        while (bytes.length < 16) {
            bytes.push(0);
        }
        var result = [];
        for (var j = 0; j < 16; j++) {
            var value = 0;
            for (var i = 0; i < bytes.length; i++) {
                var gm = GaloisMultTabl(bytes[i], constants[i]);
                // value = uint32.xor( value , GaloisMult(bytes[i], constants[i]));
                // console.log(value, gm)
                value = uint32.xor(value, gm);
                // console.log(value)
                // console.log('######################')
            }
            // return;
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
