"use strict";

const fs = require('fs')
const FootballService = require('./../model/footballService.js')
const httpGetAsJson = require('./../httpGetAsJson.js')
const footService = new FootballService(httpGetAsJson)

const hbs = require('hbs')
hbs.registerPartial(
    'favourites', 
    fs.readFileSync('./views/partialFavourites.hbs').toString()
)

module.exports = {
    /**
     * Route to /table/:id
     */
    'table_id': function (id, name, local, req, res, next) {
        console.log(name + ' -- ' + local)
        footService.getLeagueTable(id, (err, league) => {
            if(err) return next(err)
            league.title = 'League Table'
            league.user = req.user
            res.render('leagueTable', league) // status 200 + res.write(...) + res.end()
        })
    },    
    'leagues': function (req, res, next) {
        footService.getLeagues((err, leagues) => {
            if(err) return next(err)
            leagues = leaguesWithLinks(leagues)
            leagues.title = 'Leagues'
            leagues.user = req.user
            res.render('leagues', leagues) // status 200 + res.write(...) + res.end()
        })    
    }
}

function leaguesWithLinks(leagues) {
    return leagues.map(item => {
        item.leagueHref = "/football/table/" + item.id
        return item 
    })
}