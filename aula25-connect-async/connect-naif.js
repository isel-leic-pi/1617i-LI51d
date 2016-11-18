'use strict';

module.exports = function() {
    const mws = []
    const pipe = function(req, resp) {
        for(let i = 0; i < mws.length ;i++){
        	if(resp.finished != true)
        		mws[i](req,resp)
        }
    }
    pipe.use = function(mw) {
        mws.push(mw)
    }

    return pipe
}