"use strict";

const Team = require('./Team.js')

function LeagueTable(id, obj) {
    this.id = id
    this.caption = obj.leagueCaption
    this.teams  = obj.standing.map(std => new Team(std))
}

module.exports = LeagueTable