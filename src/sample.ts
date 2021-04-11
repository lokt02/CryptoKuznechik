import {ECB} from './ECB';

var ecb:ECB = new ECB();

const fs = require('fs');
let inputString: string = fs.readFileSync("input.txt", "utf8");
var encrypted: Buffer[] = ecb.Encrypt(inputString);

let result: string = ecb.Decrypt(encrypted);

for(let i = 0; i < result.length; i++){
    if(inputString[i] != result[i]){
        console.log(result[i] === '\0')
    }
}
console.log(result === inputString, result.length, inputString.length);
