"use strict";
exports.__esModule = true;
exports.CopyMas = exports.Polynom = void 0;
var Polynom = /** @class */ (function () {
    function Polynom(power, koef) {
        this.koef = CopyMas(koef);
        if (power != undefined && power >= koef.length)
            this.power = power;
        else
            this.power = koef.length - 1;
    }
    ;
    //Умножение полинома на полином
    Polynom.prototype.Mult = function (pol) {
        this.power = this.koef.length - 1;
        pol.power = pol.koef.length - 1;
        var newPolinom = new Polynom(this.power + pol.power, //результирующий полином
        []);
        for (var i = 0; i < this.power + pol.power + 1; i++) { //заполнение полинома нулями
            newPolinom.koef.push(0);
        }
        for (var i = 0; i < this.power + 1; i++) {
            for (var j = 0; j < pol.power + 1; j++) {
                //Перемножение происходит с помощью прибавления к коэфицентам результата произведений коэфицентов 
                newPolinom.koef[i + j] += (this.koef[i] * pol.koef[j]);
            }
        }
        return newPolinom;
    };
    //ОСТАТОК ОТ ДЕЛЕНИЯ ПОЛИНОМОВ
    Polynom.prototype.Mod = function (pol) {
        this.power = this.koef.length - 1;
        pol.power = pol.koef.length - 1;
        var polyCopy = new Polynom(pol.power, pol.koef);
        if (this.power < polyCopy.power) {
            return this;
        }
        var newPol = new Polynom(this.power - 1, []);
        for (var i = 0; i < this.power - 1; i++) {
            newPol.koef.push(0);
        }
        var iter = 0;
        var temp = this.koef[0] / polyCopy.koef[0];
        while (iter < polyCopy.koef.length) {
            if (this.koef[0] != 0) {
                polyCopy.koef[iter] *= temp;
                iter++;
            }
            else {
                iter++;
            }
        }
        for (var i = 0; i < this.power; i++) {
            if (!isNaN(polyCopy.koef[i]) && polyCopy.koef[i + 1] != undefined)
                newPol.koef[i] = this.koef[i + 1] - polyCopy.koef[i + 1];
            else
                newPol.koef[i] = this.koef[i + 1];
        }
        return newPol.Mod(pol);
    };
    return Polynom;
}());
exports.Polynom = Polynom;
//Копирование массива происходит именно таким оразом потому что при обычном присваивании передаются указатели.
function CopyMas(mas) {
    var tempMas = [];
    for (var i = 0; i < mas.length; i++) {
        tempMas.push(mas[i]);
    }
    return tempMas;
}
exports.CopyMas = CopyMas;
