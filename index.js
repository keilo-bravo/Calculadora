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
    console.log(sp[0].innerText);
    textArea(sp[0].innerText)
}
const arr = []

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
            const texto = arr.join(' ')
            console.log("resultado", arr[arr.length-1]);
            writeArea.innerHTML = texto; 
        }
        writeArea.scrollTo(0,100)
    }
}
function igualdad(texto, op) {
    const writeArea = document.getElementsByTagName("textarea")[0]
    let temp
    let result = 0
    if (texto.includes("-")) {
        temp = texto.split("-")
        for (let i = 1; i < temp.length; i++) {
            result = rest( temp[i-1], temp[i] )
            temp[i] = result
        }
        console.log("rest",result);
    }
    else if (op==="+" || texto.includes("+")) {
        temp = texto.split("+")
        for (let i = 1; i < temp.length; i++) {
            result = sum( temp[i-1], temp[i] )
            temp[i] = result
        }
        console.log("sum",result);
    }
    else if (op==="/" || texto.includes("/")) {
        temp = texto.split("/")
        for (let i = 1; i < temp.length; i++) {
            result = divi( temp[i-1], temp[i] )
            temp[i] = result
        }
        console.log("div",result);
    }
    else if (op==="*" || texto.includes("*")) {
        temp = texto.split("*")
        for (let i = 1; i < temp.length; i++) {
            result = multi( temp[i-1], temp[i] )
            temp[i] = result
        }
        console.log("multi",result);
    }
    writeArea.innerHTML = "= " + result;
    arr.length = 0

}
function multi( l, r ) {
    console.log(l,r);
    return parseInt(l)*parseInt(r)
}
function divi( l, r ) {
    console.log(l,r);
    if (l.includes("*")) {
        igualdad(l, "*")
    }
    else if (r.includes("*")) {
        igualdad(r, "*")
    }
    else {
        return parseInt(l)/parseInt(r)
    }
    
}
function sum( l, r ) {
    console.log(l,r);
    if (l.includes("/")) {
        igualdad(l, "/")
    }
    else if (r.includes("/")) {
        igualdad(r, "/")
    }
    else {
        return parseInt(l)+parseInt(r)
    }
}
function rest( l, r ) {
    console.log(l,r);
    if (l.includes("+")) {
        console.log(l);
        igualdad(l, "+")
    }
    else if (r.includes("+")) {
        igualdad(r, "+")
    }
    else {
        return parseInt(l)-parseInt(r)
    }
}