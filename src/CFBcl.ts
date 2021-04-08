import { Kuznec,HexInput} from './kuznec';

export class CFB{
    kuz: Kuznec;
    initv: string;
    constructor(initv:string){
        this.kuz = new Kuznec();
        this.kuz.KeyGen();
        this.initv=initv;
    }
    Encrypt(input: string){
        let inputbuf:Buffer = Buffer.from(input);
        let ctr : Buffer =Buffer.alloc(input.length);
        let numbl: number = input.length/16;
        let gamma: Buffer= Buffer.alloc(16);
        let out : Buffer=Buffer.alloc(input.length);
        ctr=HexInput(this.initv.slice());
        for(let i:number = 0; i< numbl; i++){
            gamma = this.kuz.Encryption(ctr);
            let temp:Buffer = Buffer.alloc(16);
        for(let j:number = 0; j<16;j++){
            out[16*i+j]=gamma[j]^inputbuf[16*i+j];
            temp[j]=out[16*i+j];
        }
        ctr=temp.slice();
    }
        if(input.length%16!=0){
            gamma=this.kuz.Encryption(ctr);
            for(let j:number=0;j<input.length%16;j++){
                out[16*numbl+j]=gamma[j]^inputbuf[16*numbl+j]; 
            };
        };
        return out;
    }
    Decrypt(encripted: string){
        
        let inputbuf:Buffer = Buffer.from(encripted);
        let ctr : Buffer =Buffer.alloc(encripted.length);
        let numbl: number = encripted.length/16;
        let gamma: Buffer= Buffer.alloc(16);
        let out : Buffer=Buffer.alloc(encripted.length);
        ctr=HexInput(this.initv.slice());
        for(let i:number = 0; i< numbl; i++){
            gamma = this.kuz.Encryption(ctr);
            let temp:Buffer = Buffer.alloc(16);
        for(let j:number = 0; j<16;j++){
            out[16*i+j]=gamma[j]^inputbuf[16*i+j];
            temp[j]=out[16*i+j];
        }
        ctr=temp.slice();
    }
        if(encripted.length%16!=0){
            gamma=this.kuz.Encryption(ctr);
            for(let j:number=0;j<encripted.length%16;j++){
                out[16*numbl+j]=gamma[j]^inputbuf[16*numbl+j]; 
            };
        };
        return out;

    }
}
