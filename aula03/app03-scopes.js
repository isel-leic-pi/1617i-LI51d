function foo() {
    console.log(y) // > undefined
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
    // console.log(x) // ERRO variable x is not defined
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
bar()
console.log(z)  // aceder à variável z global