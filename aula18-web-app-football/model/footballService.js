"use strict";

const http = require('http')
const LeagueTable = require('./LeagueTable.js')
const fotballUri = 'http://api.football-data.org/v1/soccerseasons/'
 

const service = {}

service.getLeagueTable = function(id, cb) {
    const path = fotballUri + id + '/leagueTable'
    httpGetAsJson(path, (err, obj) => {
        if(err) return cb(err)
        cb(null, new LeagueTable(id, obj))
    })
}

service.getTeam = function(id, cb) {
    
}
 
module.exports = service



/**
 * Does a HTTP get request and converts the JSON result to a Javascript object.
 */
function httpGetAsJson(path, cb){
    http.get(path, (resp) => {
        let res = ''
        resp.on('error', cb)
        resp.on('data', chunck => res += chunck.toString())
        resp.on('end', () => {
            cb(null, JSON.parse(res))
        })
    })    
}
