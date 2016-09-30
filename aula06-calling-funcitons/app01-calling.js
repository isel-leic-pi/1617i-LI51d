"use strict";

function test1(){
    function printName(func) { console.log('func name = ' + func.name) }
    function foo(){ console.log('I am foo'); }   
    const bar = () => { console.log('I am bar '); } // !!! função anónima
    const f1 = foo
    const f2 = foo  

    foo()
    f1()
    f2()
    bar()
    
    console.log('------------ checking function names------------')
    
    console.log(foo.name)
    printName(f1)
    console.log(f2.name)
    printName(bar)
    printName(() => 'Returning stuff')
}

// test1()

// Checking this
function test2(){
    function print() { console.log(this) }
    const obj1 = { foo: print }
    const obj2 = { msg: 'I am obj 2'}
    print()
    obj1.foo()
    // obj2.print() /// !!!! ERRO 
    print.call(obj2)
    print.apply(obj2)
}
// test2()

//Checking arguments
function test3() {
    function foo() {
        let res = ''
        /* v1
        for(let i = 0; i < arguments.length; i++) {
            res += arguments[i] + ', '
        }
        */
        /* v2
        arguments.__proto__ = new Array()
        // arguments.__proto__ = Array.prototype
        arguments.forEach(par => res += par + ', ')
        */
        /* v3
        Array
            .prototype
            .forEach
            .call(arguments, par => res += par + ', ')
            // .apply(arguments, [par => res += par + ', '])
        */
        arguments.forEach = Array.prototype.forEach
        arguments.forEach(par => res += par + ', ')
        console.log(res)
    }
    foo(3, 4, 'ola')
    foo('213', { str: 'super'})
    const a = [1, 2, 3]
    a.forEach(nr => console.log(nr))
}
test3()



