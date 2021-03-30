import uint32 = require('uint32');
import {Polynom, CopyMas} from './polynom';
import {tab1} from './Tabl1';
import {tabl_notlin} from './Tabl_notlin';
import {tabl_notlin_reverse} from './tabl_notlin_reverse';
let constants1:number[] = [148, 32, 133, 16, 194, 192, 1, 251, 1, 192, 194, 16, 133, 32, 148, 1];

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

    GaloisMult(value1:number, value2:number){//Умножение в полях Галуа
        let gm: number = 0;
        let hi_bit: number;
        for(let i = 0; i < 8; i++){
            if(value2 & 1){
                gm ^= value1;
            }
            hi_bit = value1 & parseInt("0x80", 16);
            value1 <<= 1;
            if(hi_bit < 0){
                value1 ^= parseInt("0xc3", 16);
            }
            value2 >>= 1;
        }
        return gm % 256;
    }

    XSL(plainText: number[], j: number){
        console.log("=============================================");
        console.log(HexOutput(plainText));
        for(let i = 0; i <plainText.length; i++){
            plainText[i] =  plainText[i] ^ this.iterKey[j][i];
        }
        console.log(HexOutput(plainText));
        plainText = this.S(plainText);
        console.log(HexOutput(plainText));
        plainText = this.L(plainText);
        console.log(HexOutput(plainText));
        console.log("=============================================");
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
            //console.log(HexOutput(plainText));
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
        let outKey2 = key1;
        for(let i = 0; i < iter_const.length; i++){
            internal.push(uint32.xor(key1[i], iter_const[i]));
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
        this.ConstGen();
        this.iterKey[0] = key1;
        this.iterKey[1] = key2;
        iter12[0] = key1;
        iter12[1] = key2;

        for(i = 0; i < 4; i++){
            for(let j = 0; j < 8; j +=2 ){
                iter34 = this.GOSTF(iter12[0], iter12[1], this.C[j + 8*i]);
                iter12 = this.GOSTF(iter34[0], iter34[1], this.C[j + 1 + 8*i]);
            }

            this.iterKey[2 * i + 2] = iter12[0];
            this.iterKey[2 * i + 3] = iter12[1];
        }

        return this.iterKey;
    }

    GOSTR(bytes: number[]){
    let r: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let a15: number = 0;
    for(let i = 0; i <16; i++){
        a15 ^= this.GaloisMult(bytes[i], constants1[i]);
        
    }
    for(let i = 1; i < 16; i++){
        r[i] = bytes[i-1];
    }
    
    r[0] = a15;
    return r;
}

    L(bytes: number[]){
        let result: number[] = CopyMas(bytes);
        // let result: number[];
        for(let i = 0; i < 16; i++){
            result = this.GOSTR(result);
        }
        return result;
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

    GOSTR_rev(a: number[]){
	    let a_0;
	    a_0 = 0;
	    let r_inv: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	    for (let i = 0; i < 15; i++)
	    {
		    r_inv[i+1] = a[i];
	    }
	    a_0 = a[15];
	    for (let i = 14; i >= 0; i--)
	    {
		    a_0 ^= this.GaloisMult(a[i], constants[i]);
	    }
	    r_inv[0] = a_0;
	    return r_inv;
    }

    L_rev (bytes: number[]){
	
        let res: number[] = CopyMas(bytes);

        for(let j = 0; j < 16; j++){
            res = this.GOSTR_rev(res);
        }
        return res;	
    }

    S_rev (bytes: number[]){
        while(bytes.length < 16){
            bytes.push(0);
        }
        let result: number[]=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for(let i:number=0; i<16;i++){
            result[i] = tabl_notlin.indexOf(bytes[i]);
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
