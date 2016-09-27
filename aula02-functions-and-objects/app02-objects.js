var x = new Object()
x.a = 7
x.b = 9
console.log(x.a)
console.log(x.b)
console.log(x.c) // undefined => a propriedade c nao está definida

// x.a() // ERRO => SÓ as funções têm a capacidade de ser invocadas

x.a = 'super'                // Alteração do tipo da propriedade
x.bar = msg => msg.length    // DEFINIÇÃO de um método

var nr = x.bar('isel')    // Sintaxe de chamada a um método: <ref>.<nome metodo>([args, ...])
console.log(nr)

var y = () => 'I am function'
y.a = 7
y.b = () => 'I am a method on object y, which is also a function'
console.log(y.a)
console.log(y.b)
console.log(y.b())








