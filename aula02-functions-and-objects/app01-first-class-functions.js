function foo(msg){
    console.log('------------------------------------------------')
    console.log(msg + " (" + typeof(msg) + ")")
}

var x = foo // Afectar uma variavel com uma função -- Checked!
x("ola") // "ola" -- literal -- valor do tipo primitivo String
x(7)     // 7 -- literal -- valor do tipo primitivo Number 
x(x)     // Passar uma função como parâmetro a outra função -- Checked!
x(foo)
foo(foo)


var y = function(){     // Função Anónima (sem nome)
    console.log('ola')
}

x(y)    // Chamar a função Anónima referida pela variável y


var z = label => console.log(label + 'ola')   // Função Anónima
foo(z)
z('msg: ')
