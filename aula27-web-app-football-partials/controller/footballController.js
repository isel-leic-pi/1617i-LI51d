"use strict";

const fs = require('fs')
const FootballService = require('./../model/footballService.js')
const httpGetAsJson = require('./../httpGetAsJson.js')
const footService = new FootballService(httpGetAsJson)
const url = require('url')

const handlebars = require('handlebars')
handlebars.registerPartial('favourites', fs.readFileSync('./views/partialFavourites.hbs').toString())
const viewLeagueTable = handlebars.compile(fs.readFileSync('./views/leagueTable.hbs').toString())
const viewLeagues = handlebars.compile(fs.readFileSync('./views/leagues.hbs').toString())

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

handlers.leagues = function(query, cb) {
    footService.getLeagues((err, leagues) => {
        if(err) return cb(err)
        cb(null, viewLeagues(leaguesWithLinks(leagues)))
    })    
}

function leaguesWithLinks(leagues) {
    return leagues.map(item => {
        item.leagueHref = "/leagueTable?id=" + item.id
        return item 
    })
}
module.exports = handlers