function foo() {
    for(var x = 0; x < 5; x++){
        var y = "ola"
        console.log(x)
    }
    z = x          // z variavel global
    console.log('Fim do loop')
    console.log(x)
    console.log(y)
    console.log('------------------------------------')
}

function bar() {
    "use strict"
    let y
    for(let x = 0; x < 5; x++){
        y = "ola"
        console.log(x)
    }
    // w = x          // declaração de w global não é permitida em modo "use strict"
    console.log('Fim do loop')
    // console.log(x) // Inacessível fora do bloco.
    console.log(y)
    console.log('------------------------------------')
}

foo()
// bar()
console.log(z)  // aceder à variável z global
// console.log(y)  // ERRO variável y local à função foo()