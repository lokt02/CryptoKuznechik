import { Kuznec,HexInput} from './kuznec';

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
        
        this.kuz.KeyGen();
    
        let ctr : Buffer =Buffer.alloc(this.initv.length);
        let numbl: number = entstri.length/16;
        let gamma: Buffer= Buffer.alloc(16);
        let out : Buffer = Buffer.alloc(0);
        ctr=this.initv.slice();
    
        for(let i:number = 0; i< numbl; i++){
        //gamma = this.kuz.Encryption(ctr);
        let temp:Buffer = Buffer.alloc(16);
        for(let j:number = 0; j<16;j++){
            temp[j]=ctr[j]^entstri[16*i+j];
        }
        temp=this.kuz.Encryption(temp);
        ctr=temp.slice();
        let l=temp.length+out.length;
        out = Buffer.concat([out,temp],l)
        }
        if(entstri.length%16!=0){
            let temp:Buffer = Buffer.alloc(entstri.length%16);
            for(let j:number = 0; j<entstri.length%16;j++){
                temp[j]=ctr[j]^entstri[16*numbl+j];
            }
            temp=this.kuz.Encryption(temp);
            ctr=temp.slice();
            let l=temp.length+out.length;
            out = Buffer.concat([out,temp],l)
    }
    
    return out;
    }
    
    Decrypt(out:Buffer){
                
        let ctr : Buffer =Buffer.alloc(this.initv.length);
        ctr=this.initv.slice();
        let numbl: number = out.length/16;
        let dec:Buffer = Buffer.alloc(0);
        let gamma: Buffer= Buffer.alloc(16);
        for(let i:number = 0; i< numbl; i++){
        gamma = this.kuz.Encryption(ctr);
        let temp:Buffer = Buffer.alloc(16);
        for(let j:number = 0; j<16;j++){
            temp[j]=ctr[j]^out[16*i+j];
        }
        temp=this.kuz.Encryption(temp);
        ctr=temp.slice();
        let l=temp.length+dec.length;
        dec = Buffer.concat([dec,temp],l)
    }
    if(out.length%16!=0){
        let temp:Buffer = Buffer.alloc(out.length%16);
        for(let j:number = 0; j<out.length%16;j++){
            temp[j]=ctr[j]^out[16*numbl+j];
        }
        temp=this.kuz.Encryption(temp);
        let l=temp.length+dec.length;
        dec = Buffer.concat([dec,temp],l)
    }
    return dec;
    }
}
