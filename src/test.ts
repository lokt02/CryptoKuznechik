import {CFB} from './CFB'
import {OFB} from './OFB'

let entstri: string = 'kek or crige';
let test: CFB = new CFB ();
let test1: OFB = new OFB ();
let enterbuf: Buffer = Buffer.from(entstri);
console.log(enterbuf);
console.log('=====================================');
let encr = test.Encrypt(enterbuf);
let decr = test.Decrypt(encr);
console.log('CFB\n');
console.log(encr);
console.log(decr);
console.log('=====================================');
console.log(enterbuf.toString());
console.log(encr.toString());
console.log(decr.toString());
console.log('OFB\n');
let enc1 = test1.Encrypt(enterbuf);
let dec1 = test1.Decrypt(enc1);
console.log(enc1);
console.log(dec1);
console.log(enc1.toString());
console.log(dec1.toString());
