import { Kuznec,HexInput} from './kuznec';

let kuz:Kuznec = new Kuznec();

let entstri: string = '1122334455667700ffeeddccbbaa99881122334455667700ffeeddccbbaa99880';
let initv: string ='1122334455667700ffeeddccbbaa9988';
let key: string='7766554433221100FFEEDDCCBBAA9988EFCDAB89674523011032547698BADCFE';
kuz.KeyGen(HexInput(key));
let enterbuf: Buffer = Buffer.from(entstri);
let ctr : Buffer =Buffer.alloc(initv.length);
let numbl: number = entstri.length/32;
let gamma: Buffer= Buffer.alloc(32);
let out : Buffer=Buffer.alloc(entstri.length);

ctr=HexInput(initv.slice());
for(let i:number = 0; i< numbl; i++){
    gamma = kuz.Encryption(ctr);
    let temp:Buffer = Buffer.alloc(32);
    for(let j:number = 0; j<32;j++){
        out[32*i+j]=gamma[j]^enterbuf[32*i+j];
        temp[j]=out[32*i+j];
    }
    ctr=temp.slice();
}

console.log(enterbuf);
console.log(out);

ctr=HexInput(initv.slice(0, 32));
let dec:Buffer = Buffer.alloc(out.length);
ctr=HexInput(initv.slice(0, 32));
for(let i:number = 0; i< numbl; i++){
    gamma = kuz.Encryption(ctr);
    let temp:Buffer = Buffer.alloc(32);
    for(let j:number = 0; j<32;j++){
        dec[32*i+j]=gamma[j]^out[32*i+j];
        temp[j]=out[32*i+j];
    }
    ctr=temp.slice();
}
console.log(dec);
