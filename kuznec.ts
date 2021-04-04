let tabl_notlin: Buffer=Buffer.from([
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
  ])
let constants1:Buffer = Buffer.from([148, 32, 133, 16, 194, 192, 1, 251,
     1, 192, 194, 16, 133, 32, 148, 1]);

export class Kuznec{
    C: Buffer[];
    iterKey: Buffer[];

    constructor(){
        this.iterKey = [];
    };

    SimpleReplacementEncrypt(inputString:string){
        let block: string[] = [];
        for(let i = 0; i < inputString.length; i+=16){
            block.push(inputString.slice(i, i + 16));
        }   

        var encrypted: Buffer[] = []
        for(let i = 0; i < block.length; i++){
            var buffer: Buffer = Buffer.from(block[i], 'utf-8');
            encrypted.push(this.Encryption(buffer));
        }
        return encrypted;
    }

    Decrypt(encrypted:Buffer[]){
        let decrypted: Buffer[] = [];
        for(let i = 0; i < encrypted.length; i++){
            decrypted.push(this.Decryption(encrypted[i]));
        }
        let result: string = '';
        for(let i = 0; i < decrypted.length; i++){
            result += decrypted[i].toString('utf-8');
        }
        result = result.split('\0').join('');
        return result;
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
    return gm;
}

    XSL(plaintext: Buffer, j: number){
        plaintext = this.XOR(plaintext, this.iterKey[j]);
        plaintext = this.S(plaintext);
        plaintext = this.L(plaintext);
        return plaintext;
    }

    LrSrX(cipherText: Buffer, j: number){
        cipherText = this.L_rev(cipherText);
        cipherText = this.S_rev(cipherText);
        cipherText = this.XOR(cipherText, this.iterKey[j]);
        return cipherText;
    }

    Decryption(cipherText : Buffer){
        cipherText = this.XOR(cipherText, this.iterKey[this.iterKey.length - 1]);

        for(let i = this.iterKey.length - 2; i >= 0; i--){
            cipherText = this.LrSrX(cipherText, i);
        }
        return cipherText;
    }

    XOR(a: Buffer, b: Buffer){
        let result: Buffer = Buffer.alloc(16);
        for(let i = 0; i < 16; i++){
            result[i] = a[i] ^ b[i];
        }
        return result
    }

    Encryption(plaintext : Buffer){
        for(let i = 0; i < this.iterKey.length - 1; i++){
            plaintext = this.XSL(plaintext, i);
        }
        plaintext = this.XOR(plaintext, this.iterKey[this.iterKey.length - 1]);
        return plaintext;
    }

    ConstGen(){
    this.C=[];
    for(let i = 1; i <= 32; i++){
        let z: number =i;
        let m: Buffer=Buffer.from([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
        m[15]=z;
        this.C.push(this.L(m));
    }
    return this.C;
}

    GOSTF(key1: Buffer, key2:Buffer, iter_const: Buffer){
        let internal: Buffer = Buffer.alloc(0);
        let outKey2 = key1;
        internal = this.XOR(key1, iter_const);
        internal = this.S(internal);
        internal = this.L(internal);

        let outKey1: Buffer = Buffer.alloc(0);
        outKey1 = this.XOR(internal, key2);
        
        let key: Buffer[] = [];
        key.push(outKey1);
        key.push(outKey2);
        return key;
    }

    KeyGen(masterkey: Buffer){
        let key1: Buffer = Buffer.alloc(16); let key2: Buffer = Buffer.alloc(16);
        for(let i = 0; i < 16; i++){
            key1[i] = masterkey[i];
        }
        for(let i = 16; i < 32; i++){
            key2[i - 16] = masterkey[i];
        }
        let i: number;

        let iter12: Buffer[] = [Buffer.alloc(0), Buffer.alloc(0)];
        let iter34: Buffer[] = [Buffer.alloc(0), Buffer.alloc(0)];
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

    GOSTR(bytes: Buffer){
    let r: Buffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    let a15: number = 0;
    for(let i = 15; i >= 1; i--){
        r[i] = bytes[i-1];
    }
    for(let i = 0; i <16; i++){
        a15 ^= this.GaloisMult(constants1[i], bytes[i]);
        
    }
    r[0] = a15;
    return r;
}

    L(bytes: Buffer){
        let result: Buffer = bytes.slice();
        for(let i = 0; i < 16; i++){
            result = this.GOSTR(result);
        }
        return result;
    }
    
    S (bytes: Buffer){
        let result: Buffer = Buffer.alloc(0);
        for(let i:number=0; i<bytes.length;i++){
            result = Buffer.concat([result, Buffer.from([tabl_notlin[bytes[i]]])]);
        }
        while(result.length < 16){
            result = Buffer.concat([Buffer.from([0]), result]);
        }
        return result;
    }

    GOSTR_rev(a: Buffer){
	    let a_0: number;
	    a_0 = 0;
	    let r_inv: Buffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
             0, 0, 0, 0, 0, 0]);
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

    L_rev (bytes: Buffer){
	
        let res: Buffer = bytes.slice();

        for(let j = 0; j < 16; j++){
            res = this.GOSTR_rev(res);
        }
        return res;	
    }

    S_rev (bytes: Buffer){
        while(bytes.length < 16){
            bytes = Buffer.concat([bytes, Buffer.from([0])]);
        }
        let result: Buffer=Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        for(let i:number=0; i<16;i++){
            result[i] = tabl_notlin.indexOf(bytes[i]);
        }
        return result;
    }
}
export function HexInput(byte:string){
    return(Buffer.from(byte.replace(/\s+/g, ''), 'hex'));
}
