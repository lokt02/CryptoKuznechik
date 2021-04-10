import { Kuznec} from './kuznec';

export class CTR{
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
    NewCTR(ctr: Buffer, x: number){
        let n:number = x;
        var arr = n.toString(16).replace(/\D/g, '0').split('').map(Number);
        while(arr.length!=8){arr.unshift(0);}
        let temp :Buffer= Buffer.from(arr);
        for(let i: number=0; i<8; ++i){
            ctr[i+8]+=temp[i];
        }
        return ctr;

    }
    Encrypt(entstri: Buffer){
        let ctr:Buffer = Buffer.alloc(16).fill(0);
        ctr= this.NewCTR(ctr,0);
        let numbl = entstri.length/16;
        let out: Buffer = Buffer.alloc(entstri.length);
        for(let i: number=0; i<numbl; ++i){
            let temp = this.kuz.Encryption(ctr);
            for(let j: number = 0; j<16;j++){
                out[i*16+j]= temp[j]^entstri[i*16+j];
            }
            ctr=this.NewCTR(ctr, i+1);
        }
        if(entstri.length%16!=0){
            let temp = this.kuz.Encryption(ctr);
            for(let j: number = 0; j<16;j++){
                out[numbl*16+j]= temp[j]^entstri[numbl*16+j];
            }
        }
        return out;
    }
    
    Decrypt(out:Buffer){
    }
}
