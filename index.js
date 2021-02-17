"use strict";
exports.__esModule = true;
var Byte_1 = require("./Byte");
var Byte_2 = require("./Byte");
var a = new Byte_1.Byte(5);
console.log(a.GetValue() + " " + a.GetValueDec());
var b = new Byte_1.Byte(7);
var res = Byte_2.XOR(a, b);
console.log(res);
