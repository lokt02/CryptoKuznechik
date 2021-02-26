import uint32 = require('uint32');

let constants:number[] = [1, 148, 32, 133, 16, 194,
     192, 1, 251, 1, 192, 194, 16, 133,
      32, 148]

function xorMult(value:number, multiplicator:number){
    let result:number = 0;
    let tempVal = value.toString(2);
    let tempMult = multiplicator.toString(2);
    let temp = Math.max(tempVal.length, tempMult.length);
    while(tempVal.length < temp){
        tempVal = "0" + tempVal;;
    }
    while(tempMult.length < temp){
        tempMult = "0" + tempMult;;
    }
    for(let i:number = 0; i < temp; i++){
        result += parseInt(uint32.xor(tempVal[i], tempMult[i])) * (Math.pow(2, i));
    }
    return result;
}

function BitPush(value:string[], valueToPush:string){
    value.slice(0, 1);
    value.unshift(valueToPush);
    return value;
}

export class Kuznec{
    constructor(){

    };

    L (value: number){
        console.log(xorMult(6, 3));
        let hexValue: string= uint32.toHex(value, 2);
        let hexValues = [hexValue, '00', '00', '00', '00', '00', '00',
         '00', '00', '00', '00', '00', '00', '00', '00', '00'];
        let res: string[] = [];
        let val: number = 0;
        for(let j:number = 0; j < 16; j++){
            for(let i:number = 15; i >= 0; i--){
                val += xorMult(parseInt(hexValues[i]), constants[i]);
            }
            BitPush(res, uint32.toHex(val, 2));
            
            hexValues = res;
        }
        console.log(res);

        return hexValues;
    }
}
