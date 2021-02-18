export class Byte {
    value: string; //непосредственно значение.
    size: number = 0; //длина двоичнойзаписи 
  //конструктор
    constructor(value: number, size: number) {
      let temp: string = value.toString(2);
      if(size === null || size < temp.length){
          this.size = temp.length;
      }
      else{
          this.size = size;
      }
//создание нулей для того, чтобы все длины были одинаковыми
      let dsize: number = size - temp.length
      for(let i = 0; i < dsize; i++){
        temp = '0' + temp;
      }
      this.value = temp;
    }
//вывод значения в десятичном виде как число
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
//вывод значения ввиде строки
    GetValueString(){
        return this.value;
    }

  }


//людской ксор
export function XOR(a: Byte, b: Byte){
    let max: number = Math.max(a.size, b.size);//максимвльна длина байтов
    let result: string = "";//результат сксоривания байтов
    for(let i: number = 0; i < max; i++){
        let temp: number;//временное число, которое будет запихиваться в итог
        temp = +a.GetValueString()[i] + +b.GetValueString()[i];//сложение знаков бита
        temp = temp % 2;//запиливание из простого сложения в побитовое сложение
        result += temp;//припихивание
    }

    return result;
}

export function Bit_Mult(a: Byte, b:Byte){ 

//Перевод чисел в строки(не массивы для красоты)
let x:string = a.GetValueString(); 
let y:string = b.GetValueString(); 

let m:number=Math.max(x.length,y.length); //длины
let res: string=""; //результат перемножения
for(let i:number=0;i<m;i++){ 
let t:number; // итоговое число для запихивания
t=(+x[i])*(+y[i]); //перемножение
res+=t; //припихивание к результату

} 
return res; 

}
