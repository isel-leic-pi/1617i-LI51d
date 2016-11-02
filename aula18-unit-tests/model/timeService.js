"use strict";

const DetailedTime = require('./detailedTime.js')
const UnixTime = require('./unixTime.js')

const service = {}

service.detailedTime = function(dt) {
    return new DetailedTime(dt)
}

service.unixTime = function(dt) {
    return new UnixTime(dt)
}

module.exports = service