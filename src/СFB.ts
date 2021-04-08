import { Kuznec,HexInput} from './kuznec';

let kuz:Kuznec = new Kuznec();

let entstri: string = '1122334455667700ffeeddccbbaa99881122334455667700ffeeddccbbaa99880';
let initv: string ='1122334455667700ffeeddccbbaa9988';
let key: string='7766554433221100FFEEDDCCBBAA9988EFCDAB89674523011032547698BADCFE';
kuz.KeyGen(HexInput(key));
let enterbuf: Buffer = Buffer.from(entstri);
let ctr : Buffer =Buffer.alloc(initv.length);
let numbl: number = entstri.length/16;
let gamma: Buffer= Buffer.alloc(16);
let out : Buffer=Buffer.alloc(entstri.length);
ctr=HexInput(initv.slice());
console.log(ctr);
console.log(initv);


for(let i:number = 0; i< numbl; i++){
    gamma = kuz.Encryption(ctr);
    let temp:Buffer = Buffer.alloc(16);
    for(let j:number = 0; j<16;j++){
        out[16*i+j]=gamma[j]^enterbuf[16*i+j];
        temp[j]=out[16*i+j];
    }
    ctr=temp.slice();
}

console.log(enterbuf);
console.log(out);


ctr=HexInput(initv.slice());
let dec:Buffer = Buffer.alloc(out.length);
for(let i:number = 0; i< numbl; i++){
    gamma = kuz.Encryption(ctr);
    let temp:Buffer = Buffer.alloc(16);
    for(let j:number = 0; j<16;j++){
        dec[16*i+j]=gamma[j]^out[16*i+j];
        temp[j]=out[16*i+j];
    }
    ctr=temp.slice();
}

console.log(dec);
