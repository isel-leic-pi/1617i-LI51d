'use strict';

module.exports = function() {
    const mws = []
    const pipe = function(req, resp) {
        mws[0](req, resp)

        // TPC: Percorrer todos os Middlewares do Pipeline
        // Chama o proximo apenas se: resp.finished == false
        // Se resp.finished == true termina o pipeline
    }
    pipe.use = function(mw) {
        mws.push(mw)
    }

    return pipe
}