import {Byte} from './Byte';
import {XOR} from './Byte';

let a: Byte = new Byte(5, 8);
console.log(a.GetValueString() + " " + a.GetValueDec());
let b: Byte = new Byte(7, 8);
console.log(b.GetValueString() + " " + b.GetValueDec());

let res = XOR(a, b);
console.log(res);
