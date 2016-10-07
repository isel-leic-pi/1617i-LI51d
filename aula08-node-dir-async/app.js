"use strict";

if(process.argv.length < 3) throw new Error('Please provide a path!')

const dir = require('./dirAsync.js')

dir.ls(process.argv[2], (err, data) => {
    console.log('................... Geting files names')
    data.forEach(f => console.log(f.toString()))
})

dir(process.argv[2], (err, data) => {
    console.log('................... Geting files names and nr of lines')
    data.forEach(f => console.log(f.toString()))
})
    
    
    
    
    