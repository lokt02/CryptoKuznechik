<h1>CryptoKuznechik</h1>

This is a simple package that provides a russian cryptography algorithm "kuznechik" (GOST 34.12-2018)

# How to install
To install this package enter command below to terminal:
    `npm install cryptokuznechik`

# Usage
To use this package firstly you need to choose one of the encryption mods:
* ECB (yes, only this but soon we will make more)


### ECB
For ECB you need to import class ECB from package:
```
import {ECB} from './cryptokuznechik';
```
 

Next create an instance of ECB:
```
let ecb:ECB = new ECB();
```



Now you can encrypt and decrypt messages:
```
const fs = require('fs');
let inputString: string = fs.readFileSync("input.txt", "utf8");
var encrypted: Buffer[] = ecb.Encrypt(inputString);

let result: string = ecb.Decrypt(encrypted);
```


# Authors
    * lokt02
    * KostylevVadim
