"use strict";

const fs = require('fs')
const FootballService = require('./../model/footballService.js')
const httpGetAsJson = require('./../httpGetAsJson.js')
const footService = new FootballService(httpGetAsJson)

const handlebars = require('handlebars')
handlebars.registerPartial(
    'favourites', 
    fs.readFileSync('./views/partialFavourites.hbs').toString()
)
const viewLeagueTable = handlebars.compile(fs.readFileSync('./views/leagueTable.hbs').toString())
const viewLeagues = handlebars.compile(fs.readFileSync('./views/leagues.hbs').toString())

const handlers = function(req, resp, next){
        const parts = req.path.split('/')
        const endPoint = parts[parts.length -1]

        if(!handlers.hasOwnProperty(endPoint)) return next()
        handlers[endPoint](req, (err, content) => {
            if(err) return next(err)
            resp.writeHead(200, { 'Content-Type': 'text/html' })
            resp.write(content)
            resp.end() // Termina a ligação
        })
}

handlers.leagueTable = function(req, cb) {
    const query = req.query
    const id = query.id
    footService.getLeagueTable(id, (err, league) => {
        if(err) return cb(err)
        cb(null, viewLeagueTable(league))
    })    
}

handlers.leagues = function(req, cb) {
    const query = req.query
    footService.getLeagues((err, leagues) => {
        if(err) return cb(err)
        leagues = leaguesWithLinks(leagues)
        cb(null, viewLeagues(leagues))
    })    
}

function leaguesWithLinks(leagues) {
    return leagues.map(item => {
        item.leagueHref = "/leagueTable?id=" + item.id
        return item 
    })
}

module.exports = handlers