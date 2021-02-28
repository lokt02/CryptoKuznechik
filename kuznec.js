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
function HexOutput(array) {
    var temp = "";
    for (var i = 0; i < array.length; i++) {
        temp += array[i].toString(16) + " ";
    }
    console.log(temp);
}
var Kuznec = /** @class */ (function () {
    function Kuznec() {
        this.iterKey = [];
        // for(let i = 0; i < 10; i++){
        //     this.iterKey.push([]);
        //     for(let j = 0; j < 64; j++){
        //         this.iterKey[i].push(0);
        //     }
        // }
    }
    ;
    Kuznec.prototype.ConstGen = function () {
        this.C = [];
        for (var i = 1; i <= 32; i++) {
            this.C.push(this.L([i]));
        }
        for (var i = 0; i < this.C.length; i++) {
            HexOutput(this.C[i]);
        }
        console.log("VVVVVVVVVVVVVVVVVVVVVVVV");
        return this.C;
    };
    Kuznec.prototype.GOSTF = function (key1, key2, iter_const) {
        var internal = [];
        var outKey2 = polynom_1.CopyMas(key1);
        for (var i = 0; i < iter_const.length; i++) {
            internal.push(uint32.xor(key1, iter_const));
        }
        internal = this.L(this.S(internal));
        // internal = this.L(internal);
        var outKey1 = [];
        for (var i = 0; i < key2.length; i++)
            outKey1.push(uint32.xor(internal[i], key2[i]));
        var key = [];
        key.push(outKey1);
        key.push(outKey2);
        return key;
    };
    Kuznec.prototype.KeyGen = function (key1, key2) {
        var i;
        var iter12 = [[], []];
        var iter34 = [[], []];
        this.iterKey[0] = polynom_1.CopyMas(key1);
        this.iterKey[1] = polynom_1.CopyMas(key2);
        iter12[0] = polynom_1.CopyMas(key1);
        iter12[1] = polynom_1.CopyMas(key2);
        for (i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j += 2) {
                iter34 = this.GOSTF(iter12[0], iter12[1], this.C[j + 8 * i]);
                iter12 = this.GOSTF(iter34[0], iter34[1], this.C[j + 1 + 8 * i]);
            }
            this.iterKey[2 * i + 2] = polynom_1.CopyMas(iter12[0]);
            this.iterKey[2 * i + 3] = polynom_1.CopyMas(iter12[1]);
        }
        for (var j = 0; j < 10; j++) {
            HexOutput(this.iterKey[j]);
        }
        return this.iterKey;
    };
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
