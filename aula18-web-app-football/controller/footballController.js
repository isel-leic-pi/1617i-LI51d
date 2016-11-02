"use strict";

const fs = require('fs')
const handlebars = require('handlebars')
const footballService = require('./../model/footballService.js')

const handlers = {}

handlers.leagueTable = function(query, cb) {
    const id = query.id
    footballService.getLeagueTable(id, (err, league) => {
        if(err) return cb(err)
        cb(null, JSON.stringify(league)) // TODO: Build HTML View
    })
    
}

module.exports = handlers