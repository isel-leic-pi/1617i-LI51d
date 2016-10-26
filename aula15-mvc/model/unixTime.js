"use strict";

/**
 * Constructor UnixTime
 * Receives a Date object as argument dt 
 */
function UnixTime(dt) {
    this.time = dt.getTime()
}

module.exports = UnixTime