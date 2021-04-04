import {Kuznec, HexInput} from './kuznec';

var kuz:Kuznec = new Kuznec();
kuz.KeyGen(HexInput("7766554433221100FFEEDDCCBBAA9988EFCDAB89674523011032547698BADCFE"));

var buffer: Buffer = Buffer.from('kekw', 'utf-8');
var bufferTemp: Buffer = Buffer.alloc(16 - buffer.length);
buffer = Buffer.concat([bufferTemp, buffer]);
var encrypted = kuz.Encryption(buffer);
console.log(encrypted);
var decrypted = kuz.Decryption(encrypted);
console.log(decrypted.toString('utf-8'));
