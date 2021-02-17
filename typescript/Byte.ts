export class Byte {
    value: string;
    size: number = 0;
  
    constructor(value: number, size: number) {
      let temp: string = value.toString(2);
      if(size === null || size < temp.length){
          this.size = temp.length;
      }
      else{
          this.size = size;
      }

      let dsize: number = size - temp.length
      for(let i = 0; i < dsize; i++){
        temp = '0' + temp;
      }
      this.value = temp;
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
        return this.value;
    }

  }



export function XOR(a: Byte, b: Byte){
    let max: number = Math.max(a.size, b.size);
    let result: string = "";
    for(let i: number = 0; i < max; i++){
        let temp: number;
        temp = +a.GetValueString()[i] + +b.GetValueString()[i];
        temp = temp % 2;
        result += temp;
    }

    return result;
}
