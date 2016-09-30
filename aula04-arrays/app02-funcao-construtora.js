"use strict"


function makeStudent(nr, name){
    function printStudent() { console.log(this) }
    /*
    const res = {}
    res.nr = nr
    res.name = name
    res.print = print
    return res
    */
    return {
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
}


const a = [
    makeStudent(16834, 'Maria'),
    makeStudent(65142, 'JOse'),
    new Student(76514, 'Manel'),
    new Student(76521, 'Joana')]

a.forEach(elem => elem.print())


console.log("-------- Who is Student?")
a
    .map(elem => { if(elem instanceof Student) return "Student"; else return "Object";} )
    .forEach(elem => console.log(elem))
    