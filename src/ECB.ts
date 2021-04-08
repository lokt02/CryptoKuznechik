import {Kuznec} from "./kuznec";

export class ECB{
    kuz: Kuznec;

    constructor(){
        this.kuz = new Kuznec();
        this.kuz.KeyGen();
    }

    GetKeys(){
        return this.kuz.iterKey;
    }

    SetKeys(keys: Buffer[]){
        this.kuz.iterKey = keys;
        return this.kuz.iterKey;
    }

    Encrypt(inputString:string){
        let block: string[] = [];
        for(let i = 0; i < inputString.length; i+=16){
            block.push(inputString.slice(i, i + 16));
        }   

        var encrypted: Buffer[] = []
        for(let i = 0; i < block.length; i++){
            var buffer: Buffer = Buffer.from(block[i], 'utf-8');
            encrypted.push(this.kuz.Encryption(buffer));
        }
        return encrypted;
    }

    Decrypt(encrypted:Buffer[]){
        let decrypted: Buffer[] = [];
        for(let i = 0; i < encrypted.length; i++){
            decrypted.push(this.kuz.Decryption(encrypted[i]));
        }
        let result: string = '';
        for(let i = 0; i < decrypted.length; i++){
            result += decrypted[i].toString('utf-8');
        }
        result = result.split('\0').join('');
        return result;
    }
}