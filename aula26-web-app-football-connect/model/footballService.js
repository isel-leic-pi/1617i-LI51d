"use strict";

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
    
    this.getTeam = function(id, cb) {
    
    }

}
 
module.exports = FootballService

