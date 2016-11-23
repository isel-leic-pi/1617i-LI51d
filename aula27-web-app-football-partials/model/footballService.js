"use strict";

const League = require('./League.js')
const LeagueTable = require('./LeagueTable.js')
const fotballUri = 'http://api.football-data.org/v1/soccerseasons/'
const httpGetAsJson = require('./../httpGetAsJson.js');

function FootballService(httpGetAsJson) {

    this.getLeagueTable = function(id, cb) {
        const path = fotballUri + id + '/leagueTable'
        httpGetAsJson(path, (err, obj) => {
            if(err) return cb(err)
            if(obj.error) return cb(new Error("There is no League with id = " + id))
            cb(null, new LeagueTable(id, obj))
        })
    }
    
    /**
     * cb (err, arr) => void -- receives an array of League objects
     */
    this.getLeagues = function(cb) {
        const path = fotballUri
        httpGetAsJson(path, (err, arr) => {
            if(err) return cb(err)
            cb(null, arr.map(item => new League(item)))
        })
    }

    this.getTeam = function(id, cb) {
    
    }

}
 
module.exports = FootballService

