import {Kuznec, HexInput} from './kuznec';

var kuz:Kuznec = new Kuznec();
kuz.KeyGen(HexInput("7766554433221100FFEEDDCCBBAA9988EFCDAB89674523011032547698BADCFE"));

const fs = require('fs');
let inputString: string = fs.readFileSync("input.txt", "utf8");
let block: string[] = [];
for(let i = 0; i < inputString.length; i+=16){
    block.push(inputString.slice(i, i + 16));
}

var encrypted: Buffer[] = []
for(let i = 0; i < block.length; i++){
    var buffer: Buffer = Buffer.from(block[i], 'utf-8');
    encrypted.push(kuz.Encryption(buffer));
    //console.log(encrypted);
}

let decrypted: Buffer[] = [];
for(let i = 0; i < encrypted.length; i++){
    decrypted.push(kuz.Decryption(encrypted[i]));
    // console.log(decrypted.toString('utf-8'));
}
let result: string = '';
for(let i = 0; i < decrypted.length; i++){
    result += decrypted[i].toString('utf-8');
}
console.log(result);
