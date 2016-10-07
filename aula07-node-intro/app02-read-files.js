"use strict";

if(process.argv.length < 3) throw new Error('Please provide a path!')

const fs = require('fs')

/*
 * Retorna um array com os nomes dos ficheiros
 */ 
function getFilesNames(path) {
    return fs.readdirSync(path)
}

/*
 * Retorna um array, onde cada elemento é um objecto com 2 propriedades:
 *     * name -- nome do ficheiro
 *     * nrOfLines -- numero de linhas desse ficheiro
 */
function getFilesNrOfLines(path) {
    return fs
        .readdirSync(path)    // [String] => com os nomes dos ficheiros
        .map(name => new FileInfo(name, nrOfLines(path, name)))
}

function nrOfLines(path, fileName) {
    const data = fs.readFileSync(path + '\\' + fileName)
    return data.toString().split('\n').length
}

function FileInfo(name, totalLines) {
    this.name = name
    this.nrOfLines = totalLines
    this.toString = function() {
        return this.name + ', ' + this.nrOfLines + ' lines'
    }
}

console.log('................... Geting files names')
getFilesNames(process.argv[2])
    .forEach(f => console.log(f))

console.log('................... Geting files names and nr of lines')
getFilesNrOfLines(process.argv[2])
    .forEach(f => console.log(f.toString()))

    
    
    
    
    
    