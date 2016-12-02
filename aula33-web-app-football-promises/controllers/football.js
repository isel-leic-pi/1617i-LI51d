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
        footService.getLeagueTable(id)
            .then(league => {
                league.title = 'League Table'
                league.user = req.user
                res.render('leagueTable', league) // status 200 + res.write(...) + res.end()
            })
            .catch(next)
    },    
    'leagues': function (req, res, next) {
        footService.getLeagues()
            .then(leagues => {
                leagues = leaguesWithLinks(leagues)
                leagues.title = 'Leagues'
                leagues.user = req.user
                res.render('leagues', leagues) // status 200 + res.write(...) + res.end()
            })
            .catch(next)
    }
}

function leaguesWithLinks(leagues) {
    return leagues.map(item => {
        item.leagueHref = "/football/table/" + item.id
        return item 
    })
}