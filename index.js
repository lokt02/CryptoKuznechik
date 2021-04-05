"use strict";
exports.__esModule = true;
var kuznec_1 = require("./kuznec");
var kuz = new kuznec_1.Kuznec();
kuz.KeyGen(kuznec_1.HexInput("7766554433221100FFEEDDCCBBAA9988EFCDAB89674523011032547698BADCFE"));
var fs = require('fs');
var inputString = fs.readFileSync("input.txt", "utf8");
var encrypted = kuz.ECB_Encrypt(inputString);
var result = kuz.ECB_Decrypt(encrypted);
// console.log(result);
for (var i = 0; i < result.length; i++) {
    if (inputString[i] != result[i]) {
        console.log(result[i] === '\0');
    }
}
console.log(result === inputString, result.length, inputString.length);
