"use strict";

if(process.argv.length < 3) throw new Error('Please provide a path!')

const dir = require('./dirSync.js')

/*
console.log('................... Geting files names')
dir.ls(process.argv[2])
    .forEach(f => console.log(f))

console.log('................... Geting files names and nr of lines')
dir.countLines(process.argv[2])
    .forEach(f => console.log(f.toString()))
*/

console.log('................... Geting files names and nr of lines')
// dir.ls(process.argv[2])
dir(process.argv[2])
    .forEach(f => console.log(f.toString()))
    
    
    
    
    