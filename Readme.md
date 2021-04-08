<h1>CryptoKuznechik</h1>

This is a simple package that provides a russian cryptography algorithm "kuznechik" (GOST 34.12-2018)

# How to install
To install this package enter command below to terminal:<br>
    `npm install cryptokuznechik`<br>

# Usage
To use this package firstly you need to choose one of the encryption mods:<br>
ECB (yes, only this but soon we will make more)<br>
<br>
<h5>ECB</h5>
For ECB you need to import class ECB from package:<br>
`import {ECB} from './cryptokuznechik';`<br>
Next create an instance of ECB:<br>
`let ecb:ECB = new ECB();`,<br>

Now you can encrypt and decrypt messages:<br>
`const fs = require('fs');
let inputString: string = fs.readFileSync("input.txt", "utf8");
var encrypted: Buffer[] = ecb.Encrypt(inputString);

let result: string = ecb.Decrypt(encrypted);`<br>

# Authors
    * lokt02
    * KostylevVadim
