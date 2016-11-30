"use strict";

const fs = require('fs')
const FootballService = require('./../model/footballService.js')
const httpGetAsJson = require('./../httpGetAsJson.js')
const footService = new FootballService(httpGetAsJson)

require('hbs').registerPartial(
    'favourites', 
    fs.readFileSync('./views/partialFavourites.hbs').toString()
)

const handlers = {}

handlers.leagueTable = function(req, res, next) {
    const query = req.query
    const id = query.id
    footService.getLeagueTable(id, (err, league) => {
        if(err) return next(err)
        league.user = req.user
        res.render('leagueTable', league)
    })    
}

handlers.leagues = function(req, res, next) {
    const query = req.query
    footService.getLeagues((err, leagues) => {
        if(err) return next(err)
        leagues = leaguesWithLinks(leagues)
        leagues.user = req.user
        res.render('leagues', leagues)
    })    
}

function leaguesWithLinks(leagues) {
    return leagues.map(item => {
        item.leagueHref = "/leagueTable?id=" + item.id
        return item 
    })
}

module.exports = handlers