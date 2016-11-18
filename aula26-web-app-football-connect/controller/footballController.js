"use strict";

const fs = require('fs')
const handlebars = require('handlebars')
const FootballService = require('./../model/footballService.js')
const httpGetAsJson = require('./../httpGetAsJson.js')
const footService = new FootballService(httpGetAsJson)

const viewLeagueTable = handlebars.compile(fs.readFileSync('./views/leagueTable.hbs').toString())

const handlers = {}

handlers.leagueTable = function(query, cb) {
    const id = query.id
    footService.getLeagueTable(id, (err, league) => {
        if(err) return cb(err)
        cb(null, viewLeagueTable(league))
    })
    
}

module.exports = handlers