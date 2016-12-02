"use strict";

const League = require('./League.js')
const LeagueTable = require('./LeagueTable.js')
const fotballUri = 'http://api.football-data.org/v1/soccerseasons/'
const httpGetAsJson = require('./../httpGetAsJson.js');

function FootballService(httpGetAsJson) {

    this.getLeagueTable = function(id, cb) {
        const path = fotballUri + id + '/leagueTable'
        httpGetAsJson(path)
            .then(obj => {
                if(obj.error) return cb(new Error("There is no League with id = " + id))
                if(!(obj.standing instanceof Array)) return cb(new Error("League without table standing"))
                cb(null, new LeagueTable(id, obj))
            })
            .catch(err => cb(err))
    }
    
    /**
     * cb (err, arr) => void -- receives an array of League objects
     */
    this.getLeagues = function(cb) {
        const path = fotballUri
        httpGetAsJson(path)
            .then(arr => cb(null, arr.map(item => new League(item))))
            .catch(err => cb(err))
    }

    this.getTeam = function(id, cb) {
    
    }

}
 
module.exports = FootballService

