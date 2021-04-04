import {Kuznec, HexInput} from './kuznec';

var kuz:Kuznec = new Kuznec();
kuz.KeyGen(HexInput("7766554433221100FFEEDDCCBBAA9988EFCDAB89674523011032547698BADCFE"));

const fs = require('fs');
let inputString: string = fs.readFileSync("input.txt", "utf8");
var encrypted: Buffer[] = kuz.SimpleReplacementEncrypt(inputString);

let result: string = kuz.Decrypt(encrypted);
// console.log(result);
for(let i = 0; i < result.length; i++){
    if(inputString[i] != result[i]){
        console.log(result[i] === '\0')
    }
}
console.log(result === inputString, result.length, inputString.length);
