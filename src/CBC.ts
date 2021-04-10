import { Kuznec} from './kuznec';

export class CBC{
    kuz: Kuznec;
    initv: Buffer;
    constructor(){
        this.kuz = new Kuznec();
        this.kuz.KeyGen();
        this.initv = Buffer.alloc(16);
        for(let i: number=0; i<16; i++){
            this.initv[i] = Math.floor(Math.random() * 255);
        }
    }
    Encrypt(entstri: Buffer){
        let numbl = entstri.length/16;
        let out: Buffer = Buffer.alloc(entstri.length);
        let tempvec : Buffer = Buffer.from(this.initv);
        for(let i:number=0;i<numbl;i++){
            let temp :Buffer = Buffer.alloc(16);
            for(let j:number=0;j<16;j++){
                temp[j]=entstri[i*16+j];
            }
            for(let j:number=0;j<16;j++){
                temp[j]=temp[j]^tempvec[j];
            }
            temp=this.kuz.Encryption(temp);
            tempvec=temp.slice();
            for(let j:number=0;j<16;j++){
                out[i*16+j]=temp[j];
            }
        }
        if(entstri.length%16!=0){
            let temp :Buffer = Buffer.alloc(16);
            for(let j:number=0;j<16;j++){
                temp[j]=entstri[numbl*16+j];
            }
            for(let j:number=0;j<16;j++){
                temp[j]=temp[j]^tempvec[j];
            }
            temp=this.kuz.Encryption(temp);
            tempvec=temp.slice();
            for(let j:number=0;j<16;j++){
                out[numbl*16+j]=temp[j];
            }

        }
        return out;
    }
    
    Decrypt(entstri:Buffer){
        let numbl = entstri.length/16;
        let out: Buffer = Buffer.alloc(entstri.length);
        let tempvec : Buffer = Buffer.from(this.initv);
        for(let i:number=0;i<numbl;i++){
            let temp :Buffer = Buffer.alloc(16);
            for(let j:number=0;j<16;j++){
                temp[j]=entstri[i*16+j];
            }
            temp=this.kuz.Decryption(temp);
            let temp1: Buffer = Buffer.from(temp);
            for(let j:number=0;j<16;j++){
                temp[j]=temp[j]^tempvec[j];
            }
            tempvec=temp1.slice();
            for(let j:number=0;j<16;j++){
                out[i*16+j]=temp[j];
            }
        }
        return out;
    }
}
