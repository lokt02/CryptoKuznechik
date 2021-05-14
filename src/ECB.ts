import {Kuznec} from "./kuznec";

export class ECB{
    kuz: Kuznec;

    constructor(){
        this.kuz = new Kuznec();
    }

    GetKeys(){
        return this.kuz.iterKey;
    }

    SetKeys(keys: Buffer[]){
        this.kuz.iterKey = keys;
        return this.kuz.iterKey;
    }

    Encrypt(input:Buffer){
        let numbl: number = Math.floor(input.length/16);
        let out: Buffer = Buffer.alloc((numbl+1)*16);
        for(let i:number = 0; i< numbl; i++){
            let temp:Buffer = Buffer.alloc(16);
            temp = this.kuz.Encryption(input.slice(i*16,i*16 + 16))
            for(let j:number = 0; j<16;j++){
                out[16*i+j]=temp[j];
            }
        }
        if(input.length%16!=0){
            let temp:Buffer = Buffer.alloc(16);
            temp = this.kuz.Encryption(input.slice(numbl*16,numbl*16 + input.length%16))
            for(let j:number=0;j<16;j++){
                out[16*numbl+j]=temp[j]; 
            }
        }
        return out;
    }

    Decrypt(encrypted:Buffer){
        let decrypted: Buffer = Buffer.alloc(encrypted.length);
        let numbl: number = encrypted.length/16;
        // for(let i = 0; i < encrypted.length; i++){
        //     decrypted.push(this.kuz.Decryption(encrypted[i]));
        // }
        for(let i = 0; i < numbl; i++){
            let temp: Buffer = Buffer.alloc(16);
            temp = this.kuz.Decryption(encrypted.slice(i*16,i*16 + 16))
            for(let j:number = 0; j<16;j++){
                decrypted[16*i+j]=temp[j];
            }
        }
        return decrypted;
    }
}