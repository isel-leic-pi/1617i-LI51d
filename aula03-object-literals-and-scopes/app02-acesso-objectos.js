function createPair(nr1, nr2){
    return {
        a: nr1,
        b: {x: 'ola', y: 7},
        c: () => console.log(nr2)
    }
}

var x = createPair(7,9)
console.log(x.a)  // dot notation

console.log('----------------------------')

var props = ['a', 'b', 'c']
for(var i = 0; i < props.length; i++) {
    var nomeProp = props[i]
    console.log(x[nomeProp])   // sintaxe: computed property name
}

console.log('----------------------------')

for(var prop in x)  // Iterar sobre os nomes das propriedades do objecto
    console.log(prop + ' = ' + x[prop])   // sintaxe: computed property name
    
    