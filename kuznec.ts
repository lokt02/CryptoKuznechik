import uint32 = require('uint32');
import {Polynom, CopyMas} from './polynom';
import {tab1} from './Tabl1';
import {tabl_notlin} from './Tabl_notlin';
import {tabl_notlin_reverse} from './tabl_notlin_reverse';
let constants:number[] = [1, 148, 32, 133, 16, 194,
     192, 1, 251, 1, 192, 194, 16, 133,
      32, 148]

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
    };

    GaloisMultTabl(value1:number, value2:number){//Умножение Галуа с помощю таблицы
        if(value1 === 0 || value2 === 0) return 0;
        let p1 = tab1.indexOf(value1);
        let p2 = tab1.indexOf(value2);
        let gm = tab1[(p1 + p2) % tab1.length]
        return gm;
    }

    XSL(plainText: number[], j: number){
        for(let i = 0; i <plainText.length; i++){
            plainText[i] = uint32.xor( plainText[i] , this.iterKey[j][i]);
        }
        plainText = this.S(plainText);
        plainText = this.L(plainText);
        return plainText;
    }

    LrSrX(cipherText: number[], j: number){
        cipherText = this.S_rev(cipherText);
        cipherText = this.L_rev(cipherText);
        for(let i = 0; i <cipherText.length; i++){
            cipherText[i] = uint32.xor( cipherText[i] , this.iterKey[j][i]);
        }
        return cipherText;
    }

    Decryption(cipherText : number[]){
        for(let i = 0; i < cipherText.length; i++){
            cipherText[i] = uint32.xor( cipherText[i] , this.iterKey[9][i]);
        }

        for(let i = this.iterKey.length - 2; i >= 0; i--){
            cipherText = this.LrSrX(cipherText, i);
        }
        return cipherText;
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
        return this.C;
    }

    GOSTF(key1: number[], key2:number[], iter_const: number[]){
        let internal: number[] = [];
        let outKey2 = CopyMas(key1);
        for(let i = 0; i < iter_const.length; i++){
            internal.push(uint32.xor(key1, iter_const));
        }
        internal = this.L( this.S(internal));

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
                let gm = this.GaloisMultTabl(bytes[i], constants[i]);//Результат перемножениябайта и элемента таблицы линейных преобразований.
                
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
    let result: number[]=[];
    for(let i:number=0; i<bytes.length;i++){
        result.push(tabl_notlin[bytes[i]]);
    }
    while(result.length < 16){
        result.unshift(0);
    }
    return result;
    }

    L_rev (bytes: number[]){
	
        let res: number[] =[];
        // console.log(bytes);
        for(let j = 0; j < 16; j++){
            //Это мы переставляем элемент в массиве
            let a15:number = bytes[15];
            bytes.unshift(a15);
            bytes=bytes.slice(0, 14);
    
            //Тут мы кончаем делать перестановочку
            let value = 0;
            for(let i = 0; i < bytes.length; i++){
                let gm = this.GaloisMultTabl(bytes[i], constants[i]);
                value = uint32.xor( value , gm);
                }
            res.unshift(value);
            bytes = CopyMas(res);
        }
        return res;	
    }

    S_rev (bytes: number[]){
        while(bytes.length < 16){
            bytes.push(0);
        }
        let result: number[]=[];
        for(let i:number=0; i<16;i++){
            result[i]=tabl_notlin_reverse[bytes[i]];
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
    for(let i:number=0;i<32;i+=2){
    if(byte[i] !== undefined && byte[i + 1] !== undefined){
        let B_s:number = parseInt(byte[i] + byte[i+1], 16);
        byte_num.push(B_s);
    }
    else{
        byte_num.unshift(0);
    }
    }
    return(byte_num);}
