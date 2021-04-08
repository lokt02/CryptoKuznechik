"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kuznec_1 = require("./kuznec");
var kuz = new kuznec_1.Kuznec();
kuz.KeyGen();
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
//# sourceMappingURL=sample.js.map