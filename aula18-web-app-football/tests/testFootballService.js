const LeagueTable = require('./../model/LeagueTable.js')
const Team = require('./../model/Team.js')
const footballService = require('./../model/footballService.js')


module.exports.testGetLeagueTable = function(test){
    footballService.getLeagueTable(426, (err, league) => {
        test.ok(league instanceof LeagueTable)
        test.equal(426, league.id)
        test.equal('Manchester City FC', league.teams[0].name) // ???? idempotent ???
        test.done()
    })
}
