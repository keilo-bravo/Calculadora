document.addEventListener('keyup',function (tecla) {
   tecla.preventDefault();
   tecla = "T"+tecla.keyCode
   Clickea(tecla)

})

function accion(btn) {
    Clickea(btn)
}

function Clickea(tecla) {
    const boton = document.getElementById(`${tecla}`)
    const sp = boton.getElementsByTagName("span")
    sp[0].style.transform = "translateY(0)";
    setTimeout(function () {
 
        sp[0].style.transform = "translateY(-0.2em)";
    },100 )
    textArea(sp[0].innerText)
}
const arr = []
const auxOp = {
    "l":"",
    "r":"",
}

function textArea(btn) {
    const writeArea = document.getElementsByTagName("textarea")[0]
    if (btn==="C") {
        arr.length = 0
        writeArea.innerHTML = "";
    }else if (btn === "=") {
        const texto = arr.join('')
        igualdad(texto, btn)
    }
    else{
        if (((arr[arr.length-1]==="+") || (arr[arr.length-1]==="-") || (arr[arr.length-1]==="*") || (arr[arr.length-1]==="/"))&&(btn==="+" || btn==="-" || btn==="*" || btn==="/")) {
            arr[arr.length-1]=btn
            writeArea.innerHTML = "";
            const texto = arr.join(' ')
            writeArea.innerHTML = texto; 
        } else {
            arr.push(btn)
            const texto = arr.join('')
            writeArea.innerHTML = texto; 
        }
        writeArea.scrollTo(0,100)
    }
}
function igualdad(texto, op) {
    const writeArea = document.getElementsByTagName("textarea")[0]
    let temp = texto
    let result = 0
    let aux=0
    for (let i = 0; i < temp.length; i++) {
        if(temp[i]==="-"){
            aux++
        }
    }
    if (temp.includes("*")) {
        op="*"
        temp = reOrdena(temp,aux,result,op)
    }
    else if (temp.includes("/")) {
        op="/"
        temp = reOrdena(temp,aux,result,op)
    }
    else if (temp.includes("+")) {
        op="+"
        temp = reOrdena(temp,aux,result,op)
    }
    else if (temp.includes("-")) {
        console.log(temp, aux);
        op="-"
        if (aux>1||aux===1&&temp[0]!=='-') {
            temp = reOrdena(temp,aux,result,op)
        }
        writeArea.innerHTML = "= " + temp;
        arr.length = 0
    }
    if ((!temp.includes("+"))&&(!temp.includes("*"))&&!(temp.includes("-"))&&!(temp.includes("/"))) {
        writeArea.innerHTML = "= " + temp;
        arr.length = 0
    }
}
function reOrdena(temp,aux,result,op) {
    temp = temp.split(op)
    for (let i = temp.length-2; i > -1; i--) {
        if (op==='*') {
            result = multi( temp[i], temp[i+1] )
        }
        if (op==='/') {
            result = divi( temp[i], temp[i+1] )
        }
        if (op==='+') {
            result = sum( temp[i], temp[i+1] )
        }
        if (op==='-') {
            result = rest( temp[i], temp[i+1] )
        }
        aux = `${auxOp.l}${op}${auxOp.r}`
    }
    if (result==="Error") {
        return "Error";
    }
    temp = temp.join(' ')
    while (temp.includes(" ")) {
        temp = temp.replace(" ",op)
    }
    temp = temp.replace(aux,result)
    if (temp.includes("+")||temp.includes("*")||temp.includes("-")||temp.includes("/")) {
        igualdad(temp, op)
    }
    return temp
}
function multi( l, r ) {
    if(l===''){
        l='0'
    }
    if(r===''){
        r='0'
    }
    l = verifyL(l)
    r = verifyR(r)
    return (parseFloat(l)*parseFloat(r)).toString()
}
function divi( l, r ) {
    if((l==='' || l==='0')||(r==='' || r==='0') ){
        return 'Error'
    }
    l = verifyL(l)
    r = verifyR(r)
    return (parseFloat(l)/parseFloat(r)).toString()
}
function sum( l, r ) {
    if(l===''){
        l='0'
    }
    if(r===''){
        r='0'
    }
    l = verifyL(l)
    r = verifyR(r)

    return ( parseFloat(l)+ parseFloat(r)).toString()
}
function rest( l, r ) {
    if(l===''){
        l='0'
    }
    if(r===''){
        r='0'
    }
    l = verifyL(l)
    r = verifyR(r)
    return (parseFloat(l)-parseFloat(r)).toString()
}
function verifyL(l) {
    let auxL=[]
    if (l.includes("+")||l.includes("*")||l.includes("-")||l.includes("/")) {
        for (let i = l.length-1; i > -1; i--) {
            if((l[i]==="+"||l[i]==="-"||l[i]==="/"||l[i]==="*")&&auxL.length===0) auxL.push(i)
        }
        l =l.slice(auxL[0]+1, l.length)
    }
    auxOp.l=l
    return l
}
function verifyR(r) {
    let auxR=[]
    if (r.includes("+")||r.includes("*")||r.includes("-")||r.includes("/")) {
        for (let i = 0; i < r.length; i++) {
            if((r[i]==="+"||r[i]==="-"||r[i]==="/"||r[i]==="*")&&auxR.length===0) {
                auxR.push(i)
            }
        }
        r =r.slice(0, auxR[0])
    }
    auxOp.r=r
    return r
}