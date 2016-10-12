'use strict';

const footApi = require('./footballApi.js')

if(process.argv.length < 3) throw new Error('Please provide a League id!')

const leagueId = process.argv[2]

footApi.getLeagueLeader(leagueId, (err, team) => {
    if(err != null) console.log(err)
    else console.log(team)
})

// !!!!! replace hard coded array by input arguments
footApi.getLeaders([426, 430, 436], (err, arr) => {
    if(err != null) console.log(err)
    // else arr.forEach(t => console.log(t))
    else arr.forEach(console.log)
})

