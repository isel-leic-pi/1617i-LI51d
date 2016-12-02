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

const handlers = function(req, res, next){
        const parts = req.path.split('/')
        const endPoint = parts[parts.length -1]

        if(!handlers.hasOwnProperty(endPoint)) return next()
        handlers[endPoint](req, res, next)
}

handlers.leagueTable = function(req, res, next) {
    const query = req.query
    const id = query.id
    footService.getLeagueTable(id, (err, league) => {
        if(err) return next(err)
        league.user = req.user
        res.send(viewLeagueTable(league)) // status 200 + res.write(league) + res.end()
    })    
}

handlers.leagues = function(req, res, next) {
    const query = req.query
    footService.getLeagues((err, leagues) => {
        if(err) return next(err)
        leagues = leaguesWithLinks(leagues)
        leagues.user = req.user
        res.send(viewLeagues(leagues)) // status 200 + res.write(league) + res.end()
    })    
}

function leaguesWithLinks(leagues) {
    return leagues.map(item => {
        item.leagueHref = "/leagueTable?id=" + item.id
        return item 
    })
}

module.exports = handlers