'use strict';

module.exports = function() {
    const mws = []
    const pipe = function(req, resp) {
        let i = 0
        function next() {
            if(i >= mws.length-1 || resp.finished) return
            mws[++i](req, resp, next)
        }
        mws[i](req, resp, next)

    }
    pipe.use = function(mw) {
        mws.push(mw)
    }

    return pipe
}