"use strict";

const fs = require('fs')
const handlebars = require('handlebars')
const viewParseTime = handlebars.compile(fs.readFileSync('./views/parseTimeView.hbs').toString())
const viewUnixtime = handlebars.compile(fs.readFileSync('./views/unixtime.hbs').toString())
const timeService = require('./../model/timeService.js')

const handlers = {}

handlers.parsetime = function(cb) { 
    cb(null, viewParseTime(timeService.detailedTime(new Date())))
}

handlers.unixtime = function(cb) {
    cb(null, viewUnixtime(timeService.unixTime(new Date())))
}

handlers.ola = function(cb) {
    cb(null, '<html><h1>OLA MUNDO!!!!</h1></html>')
}

module.exports = handlers