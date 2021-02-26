import uint32 = require('uint32');
import {Kuznec} from './kuznec';
import {Polynom} from './polynom';

// var kuz:Kuznec = new Kuznec();
// console.log(kuz.L(1));
var pol1 = new Polynom(0, [1, 3, 0, 1]);
const pol2 = new Polynom(0, [1, 1]);
console.log(pol1.Mult(pol2));
console.log(pol1.Mod(pol2));
