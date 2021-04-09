import { Kuznec,HexInput} from './kuznec';
import {CFB} from './CFB'


let kuz:Kuznec = new Kuznec();

let entstri: string = '100100101010101010101544645646454';


let test: CFB = new CFB ();
let enterbuf: Buffer = Buffer.from(entstri);
console.log(enterbuf);
let encr = test.Encrypt(enterbuf);
let decr = test.Decrypt(encr);
console.log(encr);
console.log(decr);
console.log('In first types=====================================');
console.log(enterbuf.toString());
console.log(encr.toString());
console.log(decr.toString());
