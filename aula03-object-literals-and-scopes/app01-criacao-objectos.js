
/*
 * 1ª Forma de criar Objectos
 */ 
// var x = new Object()


/*
 * 2ª Forma de criar Objectos
 */ 
 /*
function createPair(nr1, nr2){
    var obj = {} // Literal
    obj.a = nr1
    obj.b = nr2
    return obj
}
*/

/*
 * 3ª Forma de criar Objectos
 */ 
function createPair(nr1, nr2){
    return {
        a: nr1,
        b: {x: 'ola', y: 7},
        c: () => console.log(nr2)
    }
}

var x = createPair(7,9)
console.log(x)

var y = createPair(11,12) // o Objecto y é do mesmo tipo que x => Tem as mesmas propriedades
console.log(y)

