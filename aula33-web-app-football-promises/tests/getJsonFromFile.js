"use strict";

const premierLeague = require('./premierLeague.json')

/**
 * Does a HTTP get request and converts the JSON result to a Javascript object.
 */
module.exports = function(path, cb){
    if(path != 'http://api.football-data.org/v1/soccerseasons/426/leagueTable')
        throw new Error('Invalid path')
    cb(null, premierLeague)
}
