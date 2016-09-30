"use strict"

function print(a){
    console.log('-------------- Print Array Elements --------------')
    let res = ''
    for(let i = 0; i < a.length; i++)
        res += a[i] + ','
    console.log('Size of the array = ' + a.length)
    console.log(res)
}

function reflect(a){
    console.log('-------------- Print Array Properties --------------')
    let res = ''
    for(let prop in a)
        res += prop + ', '
    console.log(res)
}


const a = ['isel', 1, {x: 3, y: 7}, 'super', 8]
print(a)
a.foo = () => console.log('I am an Array')
reflect(a)
a.foo()

console.log('Add element on index 11')
a[11] = 'mais' 
// a.11 = 'mais' // ERRO sintáctico

console.log('Push another element')
a.push(13)

console.log('------------------ Filtering only valid Numbers-s')
print(a.filter((elem) => !isNaN(elem)))

console.log('------------------ Filter, Map and forEach chain')
a
    .filter((elem) => !isNaN(elem))
    .map(n => {if(n%2 == 0) return 'par'; else return 'impar';})
    .forEach(elem => console.log(elem))




