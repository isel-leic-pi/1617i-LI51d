'use strict';

const http = require('http')
const fotballUri = 'http://api.football-data.org/v1/soccerseasons/'

function Team(name, goals) {
    this.name = name
    this.goals = goals
}

function parseJsonToTeam(jsonData) {
    const league = JSON.parse(jsonData)
    const team = league.standing[0]
    return new Team(team.teamName, team.goals)
}

/*
 * league Id -- The id of the football league
 * cb -- a function receiving an error and a result: (err, leader) => {}
 * leader is a Team object with properties: name and goals
 */
function getLeagueLeader(leagueId, cb) {
    const path = fotballUri + leagueId + '/leagueTable'
    http.get(path, (resp) => {
        let res = ''
        resp.on('error', cb)
        resp.on('data', chunck => res += chunck.toString())
        resp.on('end', () => cb(null, parseJsonToTeam(res)))
    })
}

/*
 * ids -- array of league ids
 * cb -- (err, arr) => {}, arr is an Array of Team objects
 */
function getLeaders(ids, cb) {
    throw new Error('Not implemented Yet --- Please do your homework!!')
}

module.exports.getLeagueLeader = getLeagueLeader
module.exports.getLeaders = getLeaders


/* !!!! SEM NEXO !!!!!!!!
function getLeagueLeader(leagueId) {
    const path = fotballUri + leagueId + '/leagueTable'
    http.get(path, (req, resp) => {
        let res = ''
        resp.on('error', err => throw err) 
        resp.on('data', chunck => res += chunck.toString())
        resp.on('end', () => { return res})
    })
}

// SEM NEXO
const jsonData = getLeagueLeader(426)
console.log(jsonData)
*/