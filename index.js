"use strict";
exports.__esModule = true;
var kuznec_1 = require("./kuznec");
var kuz = new kuznec_1.Kuznec();
kuz.ConstGen();
kuz.KeyGen([119, 102, 85, 68, 51, 34, 17, 0, 255,
    238, 221, 204, 187, 170, 153, 136], [239, 205, 171, 137, 103, 69, 35, 1, 16,
    50, 84, 118, 152, 186, 220, 254]);
var temp = kuz.Encryption(kuznec_1.HexInput("8899aabbccddeeff0077665544332211"));
console.log(kuznec_1.HexOutput(temp));
// console.log(kuz.iterKey);
