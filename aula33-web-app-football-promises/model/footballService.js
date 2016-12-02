"use strict";

const League = require('./League.js')
const LeagueTable = require('./LeagueTable.js')
const fotballUri = 'http://api.football-data.org/v1/soccerseasons/'
const httpGetAsJson = require('./../httpGetAsJson.js');

function FootballService(httpGetAsJson) {

    this.getLeagueTable = function(id) {
        const path = fotballUri + id + '/leagueTable'
        return httpGetAsJson(path)
            .then(obj => {
                if(obj.error) throw new Error("There is no League with id = " + id)
                if(!(obj.standing instanceof Array)) throw new Error("League without table standing")
                return new LeagueTable(id, obj)
            })
    }
    
    this.getLeagues = function(cb) {
        const path = fotballUri
        return httpGetAsJson(path)
            .then(arr => arr.map(item => new League(item)))
    }

    this.getTeam = function(id, cb) {
    
    }

}
 
module.exports = FootballService

