<h1>CryptoKuznechik</h1>

This is a simple package that provides a russian cryptography algorithm "kuznechik" (GOST 34.12-2018)

# How to install
To install this package enter command below to terminal:
    `npm install cryptokuznechik`

# Usage
To use this package firstly you need to choose one of the encryption mods:
* ECB
* OFB
* CFB
* CTR
* OFB


### ECB
For ECB you need to import class ECB from package:
```typescript
import {ECB} from 'cryptokuznechik';
```
 

Next create an instance of ECB:
```typescript
let ecb:ECB = new ECB();
```



Now you can encrypt and decrypt messages:
```typescript
const fs = require('fs');
let inputString: string = fs.readFileSync("input.txt", "utf8");
let encrypted: Buffer[] = ecb.Encrypt(inputString);

let result: string = ecb.Decrypt(encrypted);
```

### CBC
For CBC you need to import class CBC from package:
```typescript
import {CBC} from 'cryptokuznechik';
```
 

Next create an instance of CBC:
```typescript
let cbc:CBC = new CBC();
```



Now encrypt and decrypt messages:
```typescript
let buffer: Buffer = Buffer.from(inputString);
let cbc_enc: Buffer = cbc.Encrypt(buffer);
let result: Buffer = cbc.Decrypt(cbc_enc);
```

### CFB
For CFB you need to import class CFB from package:
```typescript
import {CFB} from 'cryptokuznechik';
```
 

Next create an instance of CFB:
```typescript
let cfb:CFB = new CFB();
```



Now encrypt and decrypt messages:
```typescript
let cfb_enc: Buffer = cfb.Encrypt(buffer);
let result: Buffer = cfb.Decrypt(cfb_enc);
```

### CTR
For CTR you need to import class CTR from package:
```typescript
import {CTR} from 'cryptokuznechik';
```
 

Next create an instance of CTR:
```typescript
let ctr:CTR = new CTR();
```



Now encrypt and decrypt messages:
```typescript
let ctr_enc: Buffer = ctr.Encrypt(buffer);
let result: Buffer = ctr.Decrypt(ctr_enc);
```


### OFB
For OFB you need to import class OFB from package:
```typescript
import {OFB} from 'cryptokuznechik';
```
 

Next create an instance of OFB:
```typescript
let ofb:OFB = new OFB();
```



Now encrypt and decrypt messages:
```typescript
let ofb_enc: Buffer = ofb.Encrypt(buffer);
let result: Buffer = ofb.Decrypt(ofb_enc);
```

## Other
You also can create your own encryption mode with Kuznec:
```typescript
import {Kuznec} from 'cryptokuznechik'

let kuz: Kuznec = new Kuznec();
let block: Buffer = Buffer.from('plainTextBlock12');
let encrypted_block: Buffer = kuz.Encryption(block);
let decrypted_block: Buffer = kuz.Decryption(encrypted_block);
console.log(decrypted_block.toString('utf-8')); //// plainTextBlock12

```

# Authors
    * lokt02
    * KostylevVadim

# Special thanks
    * PotatoHD1
