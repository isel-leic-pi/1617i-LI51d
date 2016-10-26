"use strict";

/**
 * Constructor DetailedTime
 * Receives a Date object as argument dt 
 */
function DetailedTime(dt) {
    this.hours = dt.getHours()
    this.minutes = dt.getMinutes()
    this.seconds = dt.getSeconds()
}

module.exports = DetailedTime