import uint32 = require('uint32');
import {Polynom, CopyMas} from './polynom';
import {tab1} from './Tabl1';
import {tabl_notlin} from './Tabl_notlin';
let constants:number[] = [1, 148, 32, 133, 16, 194,
     192, 1, 251, 1, 192, 194, 16, 133,
      32, 148]



/*function GaloisMult(value:number, multiplicator:number){
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
}*/


function GaloisMultTabl(value1:number, value2:number){//Умножение Галуа с помощю таблицы
    if(value1 === 0 || value2 === 0) return 0;
    let p1 = tab1.indexOf(value1);
    let p2 = tab1.indexOf(value2);
    let gm = tab1[(p1 + p2) % tab1.length]
    return gm;
}

export function HexOutput(array: number[]){
    let temp = ""
    for(let i = 0; i < array.length; i++){
        temp += array[i].toString(16) + " ";
    }
    return temp;
}

export class Kuznec{
    C: number[][];
    iterKey: number[][];

    constructor(){
        this.iterKey = [];
        // for(let i = 0; i < 10; i++){
        //     this.iterKey.push([]);
        //     for(let j = 0; j < 64; j++){
        //         this.iterKey[i].push(0);
        //     }
        // }
    };

    XSL(plainText: number[], j: number){
        for(let i = 0; i <plainText.length; i++){
            plainText[i] = uint32.xor( plainText[i] , this.iterKey[j][i]);
        }
        plainText = this.S(plainText);
        plainText = this.L(plainText);
        return plainText;
    }

    XOR(a: number, b: number){
        return uint32.xor(a , b);
    }

    Encryption(plainText : number[]){
        for(let i = 0; i < this.iterKey.length; i++){
            plainText = this.XSL(plainText, i);
        }
        return plainText;
    }

    ConstGen(){
        this.C = [];
        for(let i = 1; i <= 32; i++){
            this.C.push(this.L([i]));
        }
        // for(let i = 0; i < this.C.length; i++){
        //     HexOutput(this.C[i]);
        // }
        return this.C;
    }

    GOSTF(key1: number[], key2:number[], iter_const: number[]){
        let internal: number[] = [];
        let outKey2 = CopyMas(key1);
        for(let i = 0; i < iter_const.length; i++){
            internal.push(uint32.xor(key1, iter_const));
        }
        internal = this.L( this.S(internal));
        // internal = this.L(internal);

        let outKey1: number[] = [];
        for(let i = 0; i < key2.length; i++)
            outKey1.push(uint32.xor(internal[i], key2[i]));
        
        let key: number[][] = [];
        key.push(outKey1);
        key.push(outKey2);
        return key;
    }

    KeyGen(key1: number[], key2: number[]){
        let i: number;

        let iter12: number[][] = [[], []];
        let iter34: number[][] = [[], []];
        this.iterKey[0] = CopyMas(key1);
        this.iterKey[1] = CopyMas(key2);
        iter12[0] = CopyMas(key1);
        iter12[1] = CopyMas(key2);

        for(i = 0; i < 4; i++){
            for(let j = 0; j < 8; j +=2 ){
                iter34 = this.GOSTF(iter12[0], iter12[1], this.C[j + 8*i]);
                iter12 = this.GOSTF(iter34[0], iter34[1], this.C[j + 1 + 8*i]);
            }

            this.iterKey[2 * i + 2] = CopyMas(iter12[0]);
            this.iterKey[2 * i + 3] = CopyMas(iter12[1]);
        }

        // for(let j = 0; j < 10; j++){
        //     let temp:string = HexOutput(this.iterKey[j]);
        //     console.log(temp);
        //     console.log(this.iterKey[j]);
        //     console.log(HexInput(temp));
        //     console.log("##########################");
        //     }

        

        return this.iterKey;
    }

//ЛИНЕЙНОЕ ПРЕОБРАЗОВАНИЕ
    L (bytes: number[]){
        
        while(bytes.length < 16){
            bytes.push(0);
        }
        let result: number[] = [];
        for(let j = 0; j < 16; j++){
            let value = 0;//Значение, которое будет дописываться в а15
            for(let i = 0; i < bytes.length; i++){
                let gm = GaloisMultTabl(bytes[i], constants[i]);//Результат перемножениябайта и элемента таблицы линейных преобразований.
                
                value = uint32.xor( value , gm);//ксор для получения результата, который будет записан в a15
                
            }
            // return;
            result.push(value);//добавление в конец массива значения
            bytes = CopyMas(result);//Копирование массива 
            while(bytes.length < 16){
                bytes.unshift(0);//Добавление нулей в начало
            }

        }
        return result;//результат линейного преобразования
    }
    S (bytes: number[]){
    while(bytes.length < 16){
        bytes.push(0);
    }
    let result: number[]=[];
    for(let i:number=0; i<16;i++){
        result[i]=tabl_notlin[bytes[i]];
    }
    return result;
}
}
export function HexInput(byte:string){

    //let j:number = 0;
    let byte_num: number[]=[];
    // Дописанная часть с тообой
    let temp:string[] = byte.split(' ');
    for(let k:number=0;k<temp.length;k++){
        if(temp[k].length < 2){
            temp[k] = "0" + temp[k];    
        }
    }
    byte = temp.join('');
    //сам
    for(let i:number=0;i<32;++i){
    
    let B1: number=0;
    if(byte[i]=="a") B1=10;
    if(byte[i]=="b") B1=11;
    if(byte[i]=="c") B1=12;
    if(byte[i]=="d") B1=13;
    if(byte[i]=="e") B1=14;
    if(byte[i]=="f") B1=15;
    
    if(byte[i]!="a" && byte[i]!="b" && byte[i]!="c" && byte[i]!="d" && byte[i]!="e" && byte[i]!="f"){
    B1= +byte[i];
    };
    i++;
    let B2: number=0;
    if(byte[i]=="a") B2=10;
    if(byte[i]=="b") B2=11;
    if(byte[i]=="c") B2=12;
    if(byte[i]=="d") B2=13;
    if(byte[i]=="e") B2=14;
    if(byte[i]=="f") B2=15;
    
    if(byte[i]!="a" && byte[i]!="b" && byte[i]!="c" && byte[i]!="d" && byte[i]!="e" && byte[i]!="f"){
    B2= +byte[i];
    };
    
    let B_s:number;
    B_s=16*B1+B2;
    byte_num.push(B_s);
    }
    return(byte_num);}
