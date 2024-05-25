// import {create, all} from 'mathjs'
// const config = { }
// const math = create(all, config)

let f='asin(x)'
let c=0

function diff(f){
    return math.derivative(f.toString(),'x').toString()
}

function evalDiff(f){
    return math.derivative(f.toString(),'x').evaluate({x:c})
}

function taylor(f,n){
    if(n==0){
        return{
            coef:math.evaluate(f,{x:c})
            ,expr:math.evaluate(f,{x:c})
        }
    }else if(n==1){
        return{
            coef:evalDiff(f)
            ,expr:cleanup(evalDiff(f)+"(x-"+c+")")
        }
    }else{
        for (let i = 0; i < n-1; i++) {
            f=diff(f)
        }
        return{
            coef:evalDiff(f)/factorial(n)
            ,expr:cleanup(frac(evalDiff(f),factorial(n))+"(x-"+c+")^"+n)
        }
    }
}

console.log("cat")
document.getElementById('container').innerHTML="\[ \int_{0}^{\pi} \sin(x) \, dx = 2 \]"
for (let i = 0; i < 10; i++) {
    if(taylor(f,i).coef!=0)
    console.log(taylor(f,i).expr)
}

function factorial(x){
    if(x<=1){
        return 1
    }
    return x*factorial(x-1)
}

function cleanup(str){
    str=str.split("")
    if(str.length!=1&&str[0]==1&&str[1]!="/"){
        str.splice(0,1)
    }
    for (let i = 0; i < str.length; i++) {
        if(str[i]=="("&&str[i+1]=="x"&&str[i+2]=="-"&&str[i+3]=="0"&&str[i+4]==")"){
            str[i]="x"
            str.splice(i+1,4)
        }
        if(str[i]=="-"&&str[i+1]=="-"){
            str[i]="+"
            str.splice(i+1,1)
        }
    }
    if(str[0]=="-"&&str[1]==1&&str[2]=="x"){
        str.splice(1,1)
    }
    return str.join("")
}

function frac(a,b){
    if(isInt(a/b)){
        return a/b
    }else if(a==1){
        return a+"/"+b
    }else{
        return makeFraction(a/b)
    }
}

function isInt(x){
    if(Math.floor(x)==x){
        return true
    }else{
        return false
    }
}

function makeFraction(x){
    let z=Math.floor(x)
    x=x.toString()
    x=x.split("")
    for (let i = 0; i < x.length; i++) {
        if(x[i]=="."){
            x.splice(0,i+1)
            break
        }
    }
    let d=10**x.length
    let n=x.join("")
    n=parseFloat(n)+z*d
    return reduce(n,d)
}

function reduce(numerator,denominator){
    var gcd = function gcd(a,b){
      return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);
    return numerator/gcd+"/"+denominator/gcd
  }