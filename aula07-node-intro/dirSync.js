"use strict";

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

/*
module.exports.ls = getFilesNames
module.exports.countLines = getFilesNrOfLines
*/

module.exports = getFilesNrOfLines
module.exports.ls = getFilesNames
