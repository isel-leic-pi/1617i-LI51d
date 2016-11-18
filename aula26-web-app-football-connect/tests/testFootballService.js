const LeagueTable = require('./../model/LeagueTable.js')
const Team = require('./../model/Team.js')
const FootballService = require('./../model/footballService.js')
const httpGetAsJson = require('./getJsonFromFile.js')
const footService = new FootballService(httpGetAsJson)


module.exports.testGetLeagueTable = function(test){
    footService.getLeagueTable(426, (err, league) => {
        test.ok(league instanceof LeagueTable)
        test.equal(426, league.id)
        test.ok(league.teams[0] instanceof Team)
        test.equal('Manchester City FC', league.teams[0].name)
        test.equal('Chelsea FC', league.teams[1].name)
        test.done()
    })
}
