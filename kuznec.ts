import uint32 = require('uint32');
import {Polynom, CopyMas} from './polynom';
import {tab1} from './Tabl1';

let constants:number[] = [1, 148, 32, 133, 16, 194,
     192, 1, 251, 1, 192, 194, 16, 133,
      32, 148]

// let powerOfTwo = {};

function GaloisMult(value:number, multiplicator:number){
    // let result:number = 0;
    let tempVal = value.toString(2);
    let tempMult = multiplicator.toString(2);
    // console.log(tempVal, tempMult);
    let pol1 = new Polynom(0, []);
    let pol2 = new Polynom(0, []);
    for(let i = 0; i < tempVal.length; i++){
        pol1.koef.push(parseInt(tempVal[i]));
    }
    for(let i = 0; i < tempMult.length; i++){
        pol2.koef.push(parseInt(tempMult[i]));
    }
    let result = pol1.Mult(pol2);
    let res = 0;
    for(let i = 0; i < result.koef.length; i++){
        result.koef[i] = result.koef[i] % 2;
    }
    // console.log(result.koef)
    result = result.Mod(new Polynom(0, [1, 1, 1, 0, 0, 0, 0, 1, 1]));
    // console.log(result.koef)
    // console.log('##########')
    for(let i = 0; i < result.koef.length; i++){
        res += result.koef[i] * Math.pow(2, (result.koef.length - 1 - i));
    }
    // if(res > 255){
    //     res = uint32.xor(res, 195);
    // }
    return res;
}

// function Rebuild(array:number[], elNum: number){
    
//     return ;
// }

function GaloisMultTabl(value1:number, value2:number){
    if(value1 === 0 || value2 === 0) return 0;
    let p1 = tab1.indexOf(value1);
    let p2 = tab1.indexOf(value2);
    // console.log(p1, p2);
    // console.log((p1 + p2));
    // console.log((p1 + p2) % tab1.length);
    // console.log(tab1[(p1 + p2) % tab1.length]);
    let gm = tab1[(p1 + p2) % tab1.length]
    return gm;
}

export class Kuznec{
    constructor(){

    };

    L (bytes: number[]){
        // console.log(GaloisMultTabl(0, 148)); return;
        while(bytes.length < 16){
            bytes.push(0);
        }
        let result: number[] = [];
        for(let j = 0; j < 16; j++){
            let value = 0;
            for(let i = 0; i < bytes.length; i++){
                let gm = GaloisMultTabl(bytes[i], constants[i]);
                // value = uint32.xor( value , GaloisMult(bytes[i], constants[i]));
                // console.log(value, gm)
                value = uint32.xor( value , gm);
                // console.log(value)
                // console.log('######################')
            }
            // return;
            result.push(value);
            bytes = CopyMas(result);
            while(bytes.length < 16){
                bytes.unshift(0);
            }
            //console.log("##########################");
        }
        return result;
    }
}
