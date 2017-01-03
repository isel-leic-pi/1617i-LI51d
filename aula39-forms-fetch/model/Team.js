"use strict";

 function Team(obj, teamId) {
     return teamId
        ? initTeam(this, teamId, obj)
        : initTeamForTable(this, obj)
 }

function initTeam(self, teamId, obj) {
    self.id = teamId
    self.name = obj.name
    self.code = obj.code
    self.shortName = obj.shortName
    self.squadMarketValue = obj.squadMarketValue 
    self.crestUrl = obj.crestUrl
}

function initTeamForTable(self, obj) {
    const path = obj._links.team.href.split('/')
    self.id = path[path.length - 1]
    self.position = obj.position
    self.name = obj.teamName
    self.points = obj.points
    self.goals = obj.goals
    self.players = []
}

module.exports = Team