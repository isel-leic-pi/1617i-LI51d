"use strict";

function Person (id, name) {
    this.id = id
    this.name = name
    this.print = function () { console.log(this)}
}

function Student(id, name, school, course) {
    // this.__proto__ = new Person(id, name)
    Student.prototype.__proto__ = new Person()
    Person.call(this, id, name)
    this.school = school
    this.course = course
}

const p = new Person(652, 'Maria')
const s = new Student(652, 'Ze', 'isel', 'leic')

p.print()
s.print()

console.log(p instanceof Person)
console.log(s instanceof Person)