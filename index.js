"use strict";
exports.__esModule = true;
var polynom_1 = require("./polynom");
// var kuz:Kuznec = new Kuznec();
// console.log(kuz.L(1));
var pol1 = new polynom_1.Polynom(0, [1, 3, 0, 1]);
var pol2 = new polynom_1.Polynom(0, [1, 1]);
console.log(pol1.Mult(pol2));
console.log(pol1.Mod(pol2));
