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
    'table_id': function (id, req) { // IF we return a Promise we cannot receive res
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
    },
    'put_favourites_teamid': function(teamid, req) {
        if(!req.user)
            throw Error('User not authenticated')
            
        return footService
            .getTeam(teamid)
            .then(team => {
                req.user.teams.push(team)
                return {
                    'name': team.name,
                    'layout': false 
                }
            })
    }
}

function leaguesWithLinks(leagues) {
    return leagues.map(item => {
        item.leagueHref = "/football/table/" + item.id
        return item 
    })
}