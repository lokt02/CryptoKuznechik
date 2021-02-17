import {Byte} from './Byte';
import {XOR} from './Byte';

let a: Byte = new Byte(5);
console.log(a.GetValue() + " " + a.GetValueDec());
let b: Byte = new Byte(7);

let res = XOR(a, b);
console.log(res);
