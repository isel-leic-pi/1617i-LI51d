"use strict";

const fs = require('fs')
const handlebars = require('handlebars')
const FootballService = require('./../model/footballService.js')
const httpGetAsJson = require('./../httpGetAsJson.js')
const footService = new FootballService(httpGetAsJson)
const url = require('url')

const viewLeagueTable = handlebars.compile(fs.readFileSync('./views/leagueTable.hbs').toString())

const handlers = function(req, resp, next){
        const urlInfo = url.parse(req.url, true)
        const parts = urlInfo.pathname.split('/')
        const endPoint = parts[parts.length -1]

        if(!handlers.hasOwnProperty(endPoint)) return next()
        handlers[endPoint](urlInfo.query, (err, content) => {
            if(err) return next(err)
            resp.writeHead(200, { 'Content-Type': 'text/html' })
            resp.write(content)
            resp.end() // Termina a ligação
        })
}

handlers.leagueTable = function(query, cb) {
    const id = query.id
    footService.getLeagueTable(id, (err, league) => {
        if(err) return cb(err)
        cb(null, viewLeagueTable(league))
    })
    
}

module.exports = handlers