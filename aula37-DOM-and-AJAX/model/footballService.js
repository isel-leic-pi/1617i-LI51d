"use strict";

const League = require('./League.js')
const LeagueTable = require('./LeagueTable.js')
const Team = require('./Team.js')
const fotballUri = 'http://api.football-data.org/v1'
const httpGetAsJson = require('./../httpGetAsJson.js');

function FootballService(httpGetAsJson) {

    this.getLeagueTable = function(id) {
        const path = fotballUri + '/soccerseasons/' + id + '/leagueTable'
        return httpGetAsJson(path)
            .then(obj => {
                if(obj.error) throw new Error("There is no League with id = " + id)
                if(!(obj.standing instanceof Array)) throw new Error("League without table standing")
                return new LeagueTable(id, obj)
            })
    }
    
    this.getLeagues = function() {
        const path = fotballUri + '/soccerseasons/'
        return httpGetAsJson(path)
            .then(arr => arr.map(item => new League(item)))
    }

    this.getTeam = function(teamId) {
        const path = fotballUri + '/teams/' + teamId
        return httpGetAsJson(path)
            .then(data => new Team(data, teamId))
    }
}
 
module.exports = FootballService

