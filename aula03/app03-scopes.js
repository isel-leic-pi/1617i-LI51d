function foo() {
    for(var x = 0; x < 5; x++){
        var y = "ola"
        console.log(x)
    }
    z = x
    console.log('Fim do loop')
    console.log(x)
    console.log(y)
}

function bar() {
    let x, y
    for(x = 0; x < 5; x++){
        y = "ola"
        console.log(x)
    }
    console.log('Fim do loop')
    console.log(x)
    console.log(y)
}

// console.log(y) -- INACESSIVEL for do Scope da função foo() 

foo()
bar()
