import { Kuznec} from './kuznec';

export class CBC{
    kuz: Kuznec;
    initv: Buffer;
    constructor(){
        this.kuz = new Kuznec();
        this.initv = Buffer.alloc(16);
        for(let i: number=0; i<16; i++){
            this.initv[i] = Math.floor(Math.random() * 255);
        }
    }
    GetKeys(){
        return this.kuz.iterKey;
    }

    SetKeys(keys: Buffer[]){
        this.kuz.iterKey = keys;
        return this.kuz.iterKey;
    }
    Encrypt(entstri: Buffer){
        let length: number = entstri.length%16;
        entstri = Buffer.concat([entstri, Buffer.alloc(17-length).fill(0)]);
        let numbl:number = Math.floor(entstri.length/16);
        entstri[entstri.length-1]=length;
        length= entstri.length%16;
        numbl = entstri.length%16 !== 0 ? (numbl+1): numbl;
        let out: Buffer = Buffer.alloc(numbl*16);

        let tempv: Buffer = Buffer.from(this.initv);       
        for(let j = 0; j<numbl;j++){
            let len = entstri.length-16*j;
            if(len>=16){
            len =16;}

            let temp=Buffer.alloc(len);
            for(let i: number =0; i<len;i++){
                temp[i]=entstri[j*16+i];
            }
            
            for(let i: number =0; i<len;i++){
                temp[i]=temp[i]^tempv[i];
            }
            temp=this.kuz.Encryption(temp);
            tempv= Buffer.from(temp);
            for(let i: number =0;i<16;i++){
                out[16*j+i]=temp[i];
            }
        }
        return out;
    }
    
    Decrypt(entstri:Buffer){
        let numbl:number = Math.floor(entstri.length/16);
        let out: Buffer = Buffer.alloc(entstri.length);
        let tempv: Buffer = Buffer.from(this.initv);
        for(let j: number= 0;j< numbl;j++){
            let temp:Buffer= Buffer.alloc(16);
            let temp1:Buffer= Buffer.alloc(16);
            for(let i: number =0;i<16;i++){
                temp[i]=entstri[j*16+i];
                temp1[i]=entstri[j*16+i];
            }
            temp=this.kuz.Decryption(temp);
            for(let i: number=0;i<16;i++){
                temp[i]=temp[i]^tempv[i];
            }
            
            for(let i: number=0;i<16;i++){
                out[16*j+i]=temp[i];
            }
            tempv = Buffer.from(temp1);
        }
        out = out.slice(0,out.length + out[out.length-16]-32);
        return out;
    }
}
