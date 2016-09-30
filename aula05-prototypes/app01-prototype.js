"use strict"

function makeStudent(nr, name){
    function printStudent() { console.log(this) }
    return { // tem Object como prototipo
        'nr': nr,
        'name': name,
        'print': printStudent
    }
}

function Student(nr, name) {
    function printStudent() { console.log(this) }
    this.nr = nr
    this.name = name
    this.print = printStudent
    // return this !!! implicitio !!! tem como prototipo Student
}


const std1 = makeStudent(16834, 'Maria')  // instanceof Student => false
const std2 = new Student(87634, 'Ze')     // instanceof Student => true

// const std3 = Object.create(std2)                // std2 vai ser o prototipo de std3
const std3 = {}; Object.setPrototypeOf(std3, std2) // <=> ao de cima
// const std3 = {}; std3.__proto__ = std2;  // !!!! NÂO standard !!!!!!

std2.print()
std3.print() // std tem os memsmo membros de std2 incluindo o print
std2.hello = () => console.log('hello')
std3.hello()
std2.hello() // !!!!!! ERRO !!!! std2 não tem a propriedade hello

console.log('-------------- Check Prototypes --------------')
console.log(Object.getPrototypeOf(std1))
console.log(Object.getPrototypeOf(std2))
console.log(Object.getPrototypeOf(std3))

console.log('-------------- Check __proto__ --------------')
console.log(std1.__proto__)
console.log(std2.__proto__) // !!!!!!!!! sNão é Standard
console.log(std3.__proto__)

console.log('-------------- Check properties --------------')

function showProps(obj) {
    let res = ''
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop))
            res += prop + ', '
    }
    console.log(res)
}

showProps(std1)
showProps(std2)
showProps(std3)

console.log('-------------- Override Properties --------------')

console.log('std2 nr ', std2.nr)
console.log('std3 nr ', std3.nr)
std3.nr = 789
console.log('change std3.nr')
console.log('std2 nr ', std2.nr)
console.log('std3 nr ', std3.nr)








