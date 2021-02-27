import uint32 = require('uint32');
import {Polynom} from './polynom';

let constants:number[] = [1, 148, 32, 133, 16, 194,
     192, 1, 251, 1, 192, 194, 16, 133,
      32, 148]

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

function BitPush(value:string[], valueToPush:string){
    value.slice(0, 1);
    value.push(valueToPush);
    return value;
}

export class Kuznec{
    constructor(){

    };

    L (value: number){
        console.log(GaloisMult(1, 148).toString(16));
        let hexValue: string= uint32.toHex(value, 2);
        let hexValues = ["0x" + hexValue, '0x00', '0x00', '0x00', '0x00', '0x00', '0x00',
         '0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00'];
        let res: string[] = [];
        let val: number = 0;
        for(let j:number = 0; j < 16; j++){
            val = 0;
            for(let i:number = 0; i <= 15; i++){
                let temp = parseInt(hexValues[i], 16);
                if(isNaN(temp)){
                    temp = 0;
                }
                if(temp == 1 && constants[i] == 148){
                    console.log(i, j, val);
                }
                val += GaloisMult(temp, constants[i]);
                // if(val === 2){
                //     console.log(i, j, hexValues[i], constants[i], val, GaloisMult(parseInt(hexValues[i], 16), constants[i]));
                // }
            }
            let strVal:string = (val % 255).toString(16);
            if(strVal.length < 2){
                strVal = "0" + strVal;
            }
            res = BitPush(res,  "0x" + strVal);
            
            hexValues = res;
        }
        console.log(res);

        return hexValues;
    }
}
