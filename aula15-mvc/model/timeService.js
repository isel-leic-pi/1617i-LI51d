"use strict";

const DetailedTime = require('./detailedTime.js')
const UnixTime = require('./unixTime.js')

const service = {}

service.detailedTime = function() {
    const dt = new Date()
    return new DetailedTime(dt)
}

service.unixTime = function() {
    const dt = new Date()
    return new UnixTime(dt)
}

module.exports = service