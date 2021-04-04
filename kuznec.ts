let tab1: number[]=
   [1  ,2  ,4  ,8  ,16 ,32 ,64 ,128,195,69 ,138,215,109,218,119,238,
    31 ,62 ,124,248,51 ,102,204,91 ,182,175,157,249,49 ,98 ,196,75,
    150,239,29 ,58 ,116,232,19 ,38 ,76 ,152,243,37 ,74 ,148,235,21,
    42 ,84 ,168,147,229,9  ,18 ,36 ,72 ,144,227,5  ,10 ,20 ,40 ,80,
    160,131,197,73 ,146,231,13 ,26 ,52 ,104,208,99 ,198,79 ,158,255,
    61 ,122,244,43 ,86 ,172,155,245,41 ,82 ,164,139,213,105,210,103,
    206,95 ,190,191,189,185,177,161,129,193,65 ,130,199,77 ,154,247,
    45 ,90 ,180,171,149,233,17 ,34 ,68 ,136,211,101,202,87 ,174,159,
    253,57 ,114,228,11 ,22 ,44 ,88 ,176,163,133,201,81 ,162,135,205,
    89 ,178,167,141,217,113,226,7  ,14 ,28 ,56 ,112,224,3  ,6  ,12,
    24 ,48 ,96 ,192,67 ,134,207,93 ,186,183,173,153,241,33 ,66 ,132,
    203,85 ,170,151,237,25 ,50 ,100,200,83 ,166,143,221,121,242,39,
    78 ,156,251,53 ,106,212,107,214,111,222,127,254,63 ,126,252,59,
    118,236,27 ,54 ,108,216,115,230,15 ,30 ,60 ,120,240, 35,70 ,140,
    219,117,234,23 ,46 ,92 ,184,179,165,137,209,97 ,194, 71,142,223,
    125,250,55 ,110,220,123,246,47 ,94 ,188,187,181,169,145,225,1];

let tabl_notlin: number[]=[
    252, 238, 221, 17, 207, 110, 49, 22, 251, 196, 250, 218, 35, 197, 4, 
    77, 233, 119, 240, 219, 147, 46, 153, 186, 23, 54, 241, 187, 20, 205, 
    95, 193, 249, 24, 101, 90, 226, 92, 239, 33, 129, 28, 60, 66, 139, 1, 
    142, 79, 5, 132, 2, 174, 227, 106, 143, 160, 6, 11, 237, 152, 127, 212, 
    211, 31, 235, 52, 44, 81, 234, 200, 72, 171, 242, 42, 104, 162, 253, 58, 
    206, 204, 181, 112, 14, 86, 8, 12, 118, 18, 191, 114, 19, 71, 156, 183, 
    93, 135, 21, 161, 150, 41, 16, 123, 154, 199, 243, 145, 120, 111, 157, 
    158, 178, 177, 50, 117, 25, 61, 255, 53, 138, 126, 109, 84, 198, 128, 195, 
    189, 13, 87, 223, 245, 36, 169, 62, 168, 67, 201, 215, 121, 214, 246, 124, 
    34, 185, 3, 224, 15, 236, 222, 122, 148, 176, 188, 220, 232, 40, 80, 78, 
    51, 10, 74, 167, 151, 96, 115, 30, 0, 98, 68, 26, 184, 56, 130, 100, 159, 
    38, 65, 173, 69, 70, 146, 39, 94, 85, 47, 140, 163, 165, 125, 105, 213, 
    149, 59, 7, 88, 179, 64, 134, 172, 29, 247, 48, 55, 107, 228, 136, 217, 
    231, 137, 225, 27, 131, 73, 76, 63, 248, 254, 141, 83, 170, 144, 202, 216, 
    133, 97, 32, 113, 103, 164, 45, 43, 9, 91, 203, 155, 37, 208, 190, 229, 
    108, 82, 89, 166, 116, 210, 230, 244, 180, 192, 209, 102, 175, 194, 57, 75, 99, 182
  ]
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
        let result: number[] = bytes.slice();
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
	
        let res: number[] = bytes.slice();

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
