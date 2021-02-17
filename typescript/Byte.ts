export class Byte {
    value: number;
  
    constructor(value: number) {
      let temp: string = value.toString(2);
      this.value = +temp;
    }
  
    GetValue(){
        return this.value;
    }

    GetValueDec(){
        // let temp: string = this.value.toString(10);
        // return +temp;
        let temp: string = this.value.toString();
        let result: number = 0;
        for(let i = 0; i < temp.length; i++){
            result += +temp[i] * Math.pow(2, temp.length - 1 - i);
        }
        return result;
    }

    GetValueString(){
        return this.value.toString();
    }

  }



export function XOR(a: Byte, b: Byte){
    let max: number = Math.max(a.GetValue(), b.GetValue()).toString().length;
    let result: string = "";
    for(let i: number = 0; i < max; i++){
        let temp: number;
        temp = +a.GetValueString()[i] + +b.GetValueString()[i];
        temp = temp % 2;
        result += temp;
    }

    return result;
}
