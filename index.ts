import uint32 = require('uint32');
import {Kuznec, HexInput, HexOutput} from './kuznec';
import {Polynom} from './polynom';

var kuz:Kuznec = new Kuznec();
kuz.KeyGen([119, 102, 85, 68, 51, 34, 17, 0, 255,
     238, 221, 204, 187, 170, 153, 136],
    [239, 205, 171, 137, 103, 69, 35, 1, 16,
    50, 84, 118, 152, 186, 220, 254]);

// for(let i = 0; i < 10; i++){
//     console.log(HexOutput(kuz.iterKey[i]))
// }

let temp = kuz.Encryption(
    HexInput("8899aabbccddeeff0077665544332211")
);
console.log("8899aabbccddeeff0077665544332211");
console.log(
    HexOutput(temp)
);

let temp1 = kuz.Decryption(
    temp
);
console.log(
    HexOutput(temp1)
);

let g: number[][] = [];
for(let i = 1; i < 256; i++)
{
  let temp: number[] = [];
  for(let j = 1; j < 256; j++){temp.push(kuz.GaloisMult(i, j))}
  g.push(temp);
}

const fs = require("fs");
let fileContent: string = fs.readFileSync("cppstudio.txt", "utf8");
let fileStrings: string[] = fileContent.split('\n');
// console.log(fileStrings[0]);
let fileChars: string[][] = [];
for(let i = 0; i < fileStrings.length; i++){
    fileChars.push(fileStrings[i].split(" "));
}

let parseResult: number[][] = [];
for(let i = 0; i < fileChars.length; i++){
    let tempMas: number[] = [];
    for(let j = 0; j < fileChars[i].length; j ++){
        tempMas.push(parseInt(fileChars[i][j]));
    }
    parseResult.push(tempMas);
}

let count: number = 0;
for(let i = 1; i < parseResult.length; i++){
    for(let j = 1; j < parseResult[i - 1].length; j ++){
        if(parseResult[i - 1][j - 1] === g[i - 1][j - 1]){
            
        }
        else{
            console.log('ОШИБКА: ', parseResult[i - 1][j - 1], g[i - 1][j - 1], " || ", i, j)
            count++;
        }
    }
}
console.log(count, " ошибок");
