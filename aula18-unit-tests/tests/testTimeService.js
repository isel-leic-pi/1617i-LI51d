const timeService = require('./../model/timeService.js')
const DetailedTime = require('./../model/detailedTime.js')
const UnixTime = require('./../model/unixTime.js')


module.exports.testDetailedTime = function(test){
    const now = new Date()
    const time = timeService.detailedTime(now)
    test.ok(time instanceof DetailedTime)
    test.equal(now.getHours(), time.hours)
    test.equal(now.getMinutes(), time.minutes)
    test.equal(now.getSeconds(), time.seconds)
    test.done()
}

module.exports.testUnixTime = function(test){
    const now = new Date()
    const time = timeService.unixTime(now)
    test.ok(time instanceof UnixTime)
    test.equal(now.getTime(), time.time)
    test.done()
}