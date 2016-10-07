"use strict";

function printArray(arr) {
    /*
    for(let i = 0; i < arr.length; i++)
        console.log(arr[i])
    */
    arr.forEach(elem => console.log(elem))
}

printArray(process.argv)