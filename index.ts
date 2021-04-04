import {Kuznec, HexInput} from './kuznec';

var kuz:Kuznec = new Kuznec();
kuz.KeyGen(HexInput("7766554433221100FFEEDDCCBBAA9988EFCDAB89674523011032547698BADCFE"));

var buffer: Buffer = Buffer.from('kekw', 'utf-8');
console.log(buffer)
buffer = Buffer.concat([buffer, Buffer.from([32])]);
console.log(buffer)
console.log(typeof(buffer[0]))

console.log(HexInput('77 66 55 44 33 22'))
