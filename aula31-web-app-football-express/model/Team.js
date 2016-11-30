"use strict";

 function Team(obj) {
    const path = obj._links.team.href.split('/')
    this.id = path[path.length - 1]
    this.position = obj.position
    this.name = obj.teamName
    this.points = obj.points
    this.goals = obj.goals
    this.players = []
 }

module.exports = Team