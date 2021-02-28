"use strict";
exports.__esModule = true;
exports.Kuznec = void 0;
var uint32 = require("uint32");
var polynom_1 = require("./polynom");
var Tabl1_1 = require("./Tabl1");
var Tabl_notlin_1 = require("./Tabl_notlin");
var constants = [1, 148, 32, 133, 16, 194,
    192, 1, 251, 1, 192, 194, 16, 133,
    32, 148];
/*function GaloisMult(value:number, multiplicator:number){
    // let result:number = 0;
    let tempVal = value.toString(2);
    let tempMult = multiplicator.toString(2);
    // console.log(tempVal, tempMult);
    let pol1 = new Polynom(0, []);
    let pol2 = new Polynom(0, []);
    for(let i = 0; i < tempVal.length; i++){
        pol1.koef.push(parseInt(tempVal[i]));
    }
    for(let i = 0; i < tempMult.length; i++){
        pol2.koef.push(parseInt(tempMult[i]));
    }
    let result = pol1.Mult(pol2);
    let res = 0;
    for(let i = 0; i < result.koef.length; i++){
        result.koef[i] = result.koef[i] % 2;
    }
    // console.log(result.koef)
    result = result.Mod(new Polynom(0, [1, 1, 1, 0, 0, 0, 0, 1, 1]));
    // console.log(result.koef)
    // console.log('##########')
    for(let i = 0; i < result.koef.length; i++){
        res += result.koef[i] * Math.pow(2, (result.koef.length - 1 - i));
    }
    // if(res > 255){
    //     res = uint32.xor(res, 195);
    // }
    return res;
}*/
function GaloisMultTabl(value1, value2) {
    if (value1 === 0 || value2 === 0)
        return 0;
    var p1 = Tabl1_1.tab1.indexOf(value1);
    var p2 = Tabl1_1.tab1.indexOf(value2);
    var gm = Tabl1_1.tab1[(p1 + p2) % Tabl1_1.tab1.length];
    return gm;
}
var Kuznec = /** @class */ (function () {
    function Kuznec() {
    }
    ;
    //ЛИНЕЙНОЕ ПРЕОБРАЗОВАНИЕ
    Kuznec.prototype.L = function (bytes) {
        while (bytes.length < 16) {
            bytes.push(0);
        }
        var result = [];
        for (var j = 0; j < 16; j++) {
            var value = 0; //Значение, которое будет дописываться в а15
            for (var i = 0; i < bytes.length; i++) {
                var gm = GaloisMultTabl(bytes[i], constants[i]); //Результат перемножениябайта и элемента таблицы линейных преобразований.
                value = uint32.xor(value, gm); //ксор для получения результата, который будет записан в a15
            }
            // return;
            result.push(value); //добавление в конец массива значения
            bytes = polynom_1.CopyMas(result); //Копирование массива 
            while (bytes.length < 16) {
                bytes.unshift(0); //Добавление нулей в начало
            }
        }
        return result; //результат линейного преобразования
    };
    Kuznec.prototype.S = function (bytes) {
        while (bytes.length < 16) {
            bytes.push(0);
        }
        var result = [];
        for (var i = 0; i < 16; i++) {
            result[i] = Tabl_notlin_1.tabl_notlin[bytes[i]];
        }
        return result;
    };
    return Kuznec;
}());
exports.Kuznec = Kuznec;
