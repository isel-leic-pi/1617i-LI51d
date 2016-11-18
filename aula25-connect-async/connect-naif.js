'use strict';

module.exports = function() {
    const mws = []
    const pipe = function(req, resp) {
        /* "Array.prototype.some
         * some() is pretty much the same as forEach but it
         * breaks when the callback returns true." 
         **/
        mws.some( middleware => {
            middleware(req, resp)
            return resp.finished
        })
    }
    pipe.use = function(mw) {
        mws.push(mw)
    }

    return pipe
}