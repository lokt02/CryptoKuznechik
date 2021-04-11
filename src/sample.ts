// import {ECB} from './ECB';
import {Kuznec, ECB, CBC, CFB, CTR, OFB} from './package'

var ecb:ECB = new ECB();

const fs = require('fs');
let inputString: string = fs.readFileSync("input.txt", "utf8");
var encrypted: Buffer[] = ecb.Encrypt(inputString);

let result: string = ecb.Decrypt(encrypted);

console.log(result === inputString, result.length, inputString.length);
