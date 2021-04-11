import {Kuznec, ECB, CBC, CFB, CTR, OFB} from './package'
const fs = require('fs');
let inputString: string = fs.readFileSync("input.txt", "utf8");

let ecb:ECB = new ECB();
let encrypted: Buffer[] = ecb.Encrypt(inputString);
let ecb_res: string = ecb.Decrypt(encrypted);
console.log("ECB testing... ", ecb_res === inputString, ecb_res.length, inputString.length);

let cbc:CBC = new CBC();
let cbc_enc: Buffer = cbc.Encrypt(Buffer.from(inputString));
let cbc_res: string = cbc.Decrypt(cbc_enc).toString();
console.log("CBC testing... ", cbc_res === inputString, cbc_res.length, inputString.length);

let cfb:CFB = new CFB();
let cfb_enc: Buffer = cfb.Encrypt(Buffer.from(inputString));
let cfb_res: string = cfb.Decrypt(cfb_enc).toString();
console.log("CFB testing... ", cfb_res === inputString, cfb_res.length, inputString.length);

let ctr:CTR = new CTR();
let ctr_enc: Buffer = ctr.Encrypt(Buffer.from(inputString));
let ctr_res: string = ctr.Decrypt(ctr_enc).toString();
console.log("CTR testing... ", ctr_res === inputString, ctr_res.length, inputString.length);

let ofb:OFB = new OFB();
let ofb_enc: Buffer = ofb.Encrypt(Buffer.from(inputString));
let ofb_res: string = ofb.Decrypt(ofb_enc).toString();
console.log("OFB testing... ", ofb_res === inputString, ofb_res.length, inputString.length);

let kuz: Kuznec = new Kuznec();
let block: Buffer = Buffer.from('plainTextBlock12');
let encrypted_block: Buffer = kuz.Encryption(block);
let decrypted_block: Buffer = kuz.Decryption(encrypted_block);
console.log(decrypted_block.toString('utf-8')); //// plainTextBlock12
