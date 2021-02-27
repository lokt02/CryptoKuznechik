"use strict";
exports.__esModule = true;
exports.Polynom = void 0;
var Polynom = /** @class */ (function () {
    function Polynom(power, koef) {
        this.koef = CopyMas(koef);
        if (power != undefined && power >= koef.length)
            this.power = power;
        else
            this.power = koef.length - 1;
        // console.log(power);
        // console.log(this.power);
        // console.log(this);
    }
    ;
    Polynom.prototype.Mult = function (pol) {
        var newPolinom = new Polynom(this.power + pol.power, []);
        for (var i = 0; i < this.power + pol.power + 1; i++) {
            newPolinom.koef.push(0);
        }
        for (var i = 0; i < this.power + 1; i++) {
            for (var j = 0; j < pol.power + 1; j++) {
                newPolinom.koef[i + j] += (this.koef[i] * pol.koef[j]);
            }
        }
        return newPolinom;
    };
    Polynom.prototype.Mod = function (pol) {
        // console.log("pol = " ,pol);
        var polyCopy = new Polynom(pol.power, pol.koef);
        // console.log("polCop = " ,polyCopy);
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
                // console.log(this.koef[0]);
                // console.log(this.koef[0]/polyCopy.koef[0]);
                polyCopy.koef[iter] *= temp;
                // console.log("pol = " ,pol);
                iter++;
            }
            else {
                iter++;
            }
        }
        for (var i = 0; i < this.power; i++) {
            // console.log(this.koef[i + 1], polyCopy.koef[i + 1]);
            if (!isNaN(polyCopy.koef[i]) && polyCopy.koef[i + 1] != undefined)
                newPol.koef[i] = this.koef[i + 1] - polyCopy.koef[i + 1];
            else
                newPol.koef[i] = this.koef[i + 1];
        }
        console.log(newPol);
        console.log("pol = ", pol);
        return newPol.Mod(pol);
    };
    return Polynom;
}());
exports.Polynom = Polynom;
function CopyMas(mas) {
    var tempMas = [];
    for (var i = 0; i < mas.length; i++) {
        tempMas.push(mas[i]);
    }
    return tempMas;
}
