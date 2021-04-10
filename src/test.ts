import {CFB} from './CFB'
import {OFB} from './OFB'
import {CTR} from './CTR'

let entstri: string = 'kek or crige';
let test: CFB = new CFB ();
let test1: OFB = new OFB ();
let test3: CTR = new CTR ();
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
console.log('CTR\n');
let enc3= test3.Encrypt(enterbuf);
console.log(test3.Encrypt(enterbuf));
console.log(test3.Decrypt(enc3));
console.log(enc3.toString());
console.log(test3.Decrypt(enc3).toString());
