import {Kuznec} from "./kuznec";

export class CTR{
    kuz: Kuznec;

    constructor(){
        this.kuz = new Kuznec();
        this.kuz.KeyGen();
    }

    inc_ctr(ctr: Buffer){
        let internal = 0;
        let bit: Buffer = Buffer.alloc(16).fill(0);
        bit[15] = 1;
        for(let i = 15; i >= 0; i++){
            internal = ctr[i] + bit[i] + (internal >> 8);
            ctr[i] = internal & 0xff;
        }
        return ctr;
    }

    Encrypt(inputString: string){
        let block: string[] = [];
        for(let i = 0; i < inputString.length; i+=16){
            if(inputString.length > i)
                block.push(inputString.slice(i, i + 16));
            else
                block.push(inputString.slice(i - 16, inputString.length - 1))
        }
        
        let plainText: Buffer[] = [];
        for(let i = 0; i < block.length; i++){
            plainText.push(Buffer.from(block[i]));
        }


        var encrypted: Buffer[] = []
        for(let i = 0; i < block.length; i++){
            var buffer: Buffer = Buffer.from(block[i], 'utf-8');
            encrypted.push(this.kuz.Encryption(buffer));
        }
    }

    Decrypt(encrypted: Buffer){
        
    }
}