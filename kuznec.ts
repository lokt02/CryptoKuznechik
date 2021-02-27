import uint32 = require('uint32');
import {Polynom, CopyMas} from './polynom';

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
    result = result.Mod(new Polynom(0, [1, 1, 1, 0, 0, 0, 0, 1, 1]));
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

export class Kuznec{
    constructor(){

    };

    L (bytes: number[]){
        while(bytes.length < 16){
            bytes.push(0);
        }
        let result: number[] = [];
        for(let j = 0; j < 16; j++){
            let value = 0;
            for(let i = 0; i < bytes.length; i++){
                value = uint32.xor( value , GaloisMult(bytes[i], constants[i]));
            }
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
