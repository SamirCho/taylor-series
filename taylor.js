let f,c,numTerms,bigString

function display(){
    bigString=""
    document.getElementById("container").innerHTML=""
    f=document.getElementById("function").value.toString()
    c=parseFloat(document.getElementById("center").value)
    numTerms=parseFloat(document.getElementById("degree").value)+1
    for (let i = 0; i < numTerms; i++) {
        if(taylor(f,i).coef!=0){
            bigString+=taylor(f,i).expr
            bigString+="+"
        }
    }
    document.getElementById("container").innerHTML=f+" ≈ "+cleanup2(bigString)
}

function cleanup2(str){
    str=str.split("")
    if(str[0]=="+"){
        str.splice(0,1)
    }
    if(str[str.length-1]=="+"){
        str.splice(str.length-1,1)
    }
    for (let i = 0; i < str.length; i++) {
        if(str[i]=="+"&&str[i+1]=="+"){
            str.splice(i,1)
        }
        if(str[i]=="+"&&str[i+1]=="-"){
            str.splice(i,1)
        }
        if(str[i]=="-"&&str[i+1]=="+"){
            str.splice(i+1,1)
        }
        if(str[i]==1&&str[i+1]=="/"&&str[i+2]==1){
            str.splice(i,3)
        }
    }
    return spacing(str.join(""))
}

function spacing(str){
    str=str.split("")
    for (let i = 0; i < str.length; i++) {
        if(str[i]=="+"){
            str[i]=" + "
        }
        if(str[i]=="-"){
            str[i]=" - "
        }
    }
    return str.join("")
}

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
            ,expr:cleanup(reduce(evalDiff(f),factorial(n))+"(x-"+c+")<sup>"+n+"</sup>")
        }
    }
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

function reduce(numerator,denominator){
    if(numerator<0){
        return "-"+reduce(-numerator,denominator)
    }
    var gcd = function gcd(a,b){
      return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);
    return numerator/gcd+"/"+denominator/gcd
}