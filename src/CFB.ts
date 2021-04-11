import { Kuznec} from './kuznec';

export class CFB{
    kuz: Kuznec;
    initv: Buffer;
    constructor(){
        this.kuz = new Kuznec();
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
        let out : Buffer=Buffer.alloc(entstri.length);
        ctr=this.initv.slice();
    
        for(let i:number = 0; i< numbl; i++){
        gamma = this.kuz.Encryption(ctr);
        let temp:Buffer = Buffer.alloc(16);
        for(let j:number = 0; j<16;j++){
            out[16*i+j]=gamma[j]^entstri[16*i+j];
            temp[j]=out[16*i+j];
        }
        ctr=temp.slice();
        }
        if(entstri.length%16!=0){
        gamma=this.kuz.Encryption(ctr);
        for(let j:number=0;j<entstri.length%16;j++){
        out[16*numbl+j]=gamma[j]^entstri[16*numbl+j]; 
    }
    }
    
    return out;
    }
    
    Decrypt(out:Buffer){
                
        let ctr : Buffer =Buffer.alloc(this.initv.length);
        ctr=this.initv.slice();
        let numbl: number = out.length/16;
        let dec:Buffer = Buffer.alloc(out.length);
        let gamma: Buffer= Buffer.alloc(16);
        for(let i:number = 0; i< numbl; i++){
        gamma = this.kuz.Encryption(ctr);
        let temp:Buffer = Buffer.alloc(16);
        for(let j:number = 0; j<16;j++){
            dec[16*i+j]=gamma[j]^out[16*i+j];
            temp[j]=out[16*i+j];
        }
        ctr=temp.slice();
    }
    if(out.length%16!=0){
        gamma=this.kuz.Encryption(ctr);
        for(let j:number=0;j<out.length%16;j++){
        dec[16*numbl+j]=gamma[j]^out[16*numbl+j]; 
    }
    }
    return dec;
    }
}
