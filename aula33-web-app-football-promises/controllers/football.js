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
    'table_id': function (id, name, local, req) { // IF we return a Promise we cannot receive res
        console.log(name + ' -- ' + local)
        return footService
            .getLeagueTable(id)
            .then(league => {
                league.title = 'League Table'
                league.user = req.user
                return league // connect-controller renders a View with name equals to this method 
            })
    },    
    'leagues': function (req) { // IF we return a Promise we cannot receive res
        return footService
            .getLeagues()
            .then(leagues => {
                const ctx = {
                    'title': 'Leagues',
                    'user': req.user,
                    'leagues': leaguesWithLinks(leagues)    
                }
                return ctx // connect-controller renders a View with name equals to this method
            })
    }
}

function leaguesWithLinks(leagues) {
    return leagues.map(item => {
        item.leagueHref = "/football/table/" + item.id
        return item 
    })
}