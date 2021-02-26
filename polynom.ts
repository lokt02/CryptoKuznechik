export class Polynom {
    power: number;
    koef: number[];
    constructor(power: number, koef: number[]){
        this.koef = koef;
        if (power != undefined && power >= koef.length) this.power = power;
        else this.power = koef.length - 1;
        // console.log(power);
        // console.log(this.power);
        // console.log(this);
    };

    Mult(pol: Polynom){
        let newPolinom = new Polynom(this.power + pol.power,
            []);
        for(let i:number = 0; i < this.power + pol.power + 1; i++){
                newPolinom.koef.push(0);
        }
        for(let i:number = 0; i < this.power + 1; i++){
            for(let j:number = 0; j < pol.power + 1; j++){  
                newPolinom.koef[i + j] += (this.koef[i] * pol.koef[j]);
            }
        }
        return newPolinom;
    }

    Mod(pol: Polynom){
        console.log("pol = " ,pol);
        let polyCopy = new Polynom(pol.power, pol.koef);
        console.log("polCop = " ,polyCopy);
        if(this.power < polyCopy.power){
            return this;
        }
        let newPol = new Polynom(this.power - 1, []);
        for(let i:number = 0; i < this.power - 1; i++){
            newPol.koef.push(0);
        }
        // for(let i:number = 0; i < pol.power + 1; i++){
        //     if(this.koef[0] != 0)
        //         pol.koef[i] *= this.koef[0]/pol.koef[0];
        // }
        let iter:number = 0;
        while(iter < polyCopy.koef.length){
            if(this.koef[0] != 0){
                polyCopy.koef[iter] *= this.koef[0]/polyCopy.koef[0];
                iter++;
            }
            else{
                iter ++;
            }
        }
        for(let i:number = 0; i < this.power; i++){
            console.log(this.koef[i + 1], polyCopy.koef[i + 1]);
            if(!isNaN(polyCopy.koef[i]) && polyCopy.koef[i + 1] != undefined)
                newPol.koef[i] = this.koef[i + 1] - polyCopy.koef[i + 1];
            else 
                newPol.koef[i] = this.koef[i + 1];
        }
        console.log(newPol);
        return newPol.Mod(pol);
    }
}