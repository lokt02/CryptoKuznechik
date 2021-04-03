import {Polynom, CopyMas} from './polynom';
import {tab1} from './Tabl1';
import {tabl_notlin} from './Tabl_notlin';
import {tabl_notlin_reverse} from './tabl_notlin_reverse';
let constants1:number[] = [148, 32, 133, 16, 194, 192, 1, 251,
     1, 192, 194, 16, 133, 32, 148, 1];

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

    GaloisMult(value1:number, value2:number){
    let gm: number = 0;
    let hi_bit: number;
    for(let i = 0; i < 8; i++){
        if(value2 & 1){
            gm ^= value1;
        }
        hi_bit = value1 & 0x80;
        value1 <<= 1;
        if(hi_bit){
            value1 ^= 0xc3;
        }
        value2 >>= 1;
    }
    return gm%256;
}

    XSL(plaintext: number[], j: number){
        plaintext = this.XOR(plaintext, this.iterKey[j]);
        plaintext = this.S(plaintext);
        plaintext = this.L(plaintext);
        return plaintext;
    }

    LrSrX(cipherText: number[], j: number){
        cipherText = this.L_rev(cipherText);
        cipherText = this.S_rev(cipherText);
        cipherText = this.XOR(cipherText, this.iterKey[j]);
        return cipherText;
    }

    Decryption(cipherText : number[]){
        // for(let i = 0; i < cipherText.length; i++){
        //     cipherText[i] = cipherText[i] ^ this.iterKey[9][i];
        // }
        cipherText = this.XOR(cipherText, this.iterKey[this.iterKey.length - 1]);

        for(let i = this.iterKey.length - 2; i >= 0; i--){
            cipherText = this.LrSrX(cipherText, i);
        }
        return cipherText;
    }

    XOR(a: number[], b: number[]){
        let result: number[] = [];
        for(let i = 0; i < 16; i++){
            result.push(a[i] ^ b[i])
        }
        return result
    }

    Encryption(plaintext : number[]){
        for(let i = 0; i < this.iterKey.length - 1; i++){
            plaintext = this.XSL(plaintext, i);
            //console.log(HexOutput(plaletext));
        }
        plaintext = this.XOR(plaintext, this.iterKey[this.iterKey.length - 1]);
        return plaintext;
    }

    ConstGen(){
    this.C=[];
    for(let i = 1; i <= 32; i++){
        let z: number =i;
        let m: number[]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        m[15]=z;
        // let s= HexOutput(m);
        // console.log(s);
        this.C.push(this.L(m));
    }
    return this.C;
}

    GOSTF(key1: number[], key2:number[], iter_const: number[]){
        // console.log("======================================");
        let internal: number[] = [];
        let outKey2 = key1;
        // console.log(HexOutput(key1), " ", HexOutput(key2));
        internal = this.XOR(key1, iter_const);
        // console.log(HexOutput(internal), " ", HexOutput(key2));
        internal = this.S(internal);
        // console.log(HexOutput(internal), " ", HexOutput(key2));
        internal = this.L(internal);
        // console.log(HexOutput(internal), " ", HexOutput(key2));

        let outKey1: number[] = [];
        for(let i = 0; i < key2.length; i++)
            outKey1.push(internal[i] ^ key2[i]);
        // console.log(HexOutput(outKey1), " ", HexOutput(outKey2));
        
        let key: number[][] = [];
        key.push(outKey1);
        key.push(outKey2);
        // console.log(HexOutput(key[0]), " ", HexOutput(key[0]));
        // console.log("======================================");
        return key;
    }

    KeyGen(masterkey: number[]){
        let key1: number[] = []; let key2: number[] = [];
        for(let i = 0; i < 16; i++){
            key1[i] = masterkey[i];
        }
        for(let i = 16; i < 32; i++){
            key2[i - 16] = masterkey[i];
        }
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

    // for(let i = 1; i < 16; i++){
    //     r[i] = bytes[i-1];
    // }

    for(let i = 15; i >= 1; i--){
        r[i] = bytes[i-1];
    }

    // console.log("ПЕРВЫЙ ЦИКЛ ЛОЛ ", HexOutput(r), " ", HexOutput(bytes));
    for(let i = 0; i <16; i++){
        a15 ^= this.GaloisMult(constants1[i], bytes[i]);
        
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
	    let a_0: number;
	    a_0 = 0;
	    let r_inv: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
             0, 0, 0, 0, 0, 0];
	    // for (let i = 0; i < 15; i++)
	    // {
		//     r_inv[i+1] = a[i];
	    // }
        for(let i = 0; i < 15; i++){
            r_inv[i] = a[i+1];
        }
	    a_0 = a[0];
	    for (let i = 0; i < 15; i++)
	    {
		    a_0 ^= this.GaloisMult(a[i + 1], constants1[i]);
	    }
	    r_inv[15] = a_0;
	    return r_inv;
    }

    L_rev (bytes: number[]){
	
        let res: number[] = CopyMas(bytes);

        for(let j = 0; j < 16; j++){
            res = this.GOSTR_rev(res);
            // console.log(HexOutput(res), " ", j);
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
    for(let i:number=0;i<byte.length;i+=2){
        if(byte[i] !== undefined && byte[i + 1] !== undefined){
            let B_s:number = parseInt(byte[i] + byte[i+1], 16);
            byte_num.push(B_s);
        }
    }
    while(byte_num.length < 16){
        byte_num.unshift(0);
    }
    return(byte_num);}
