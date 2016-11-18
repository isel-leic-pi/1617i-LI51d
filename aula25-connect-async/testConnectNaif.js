const connect = require('./connect-naif.js')

function Resp(){
    this.finished = false
    this.end= () => this.finished = true
}

module.exports.testEndFirstMiddlewares = function testEndFirstMiddlewares(test){
    const pipe = connect()
    const resp = new Resp()

    let mw1Ran = false;
    function mw1(req, resp) {
        mw1Ran = true
        resp.end()
    }

    let mw2Ran = false;
    function mw2(req, resp) {
        mw2Ran = true
    }

    let mw3Ran = false;
    function mw3(req, resp) {
        mw3Ran = true
    }

    pipe.use(mw1)
    pipe.use(mw2)
    pipe.use(mw3)

    pipe(null,resp)

    test.expect(4)
    test.ok(resp.finished)
    test.ok(mw1Ran)
    test.ok(!mw2Ran)
    test.ok(!mw3Ran)
    test.done()
}

module.exports.testEndSecondMiddlewares = function testEndSecondMiddlewares(test){
    const pipe = connect()
    const resp = new Resp()

    let mw1Ran = false;
    function mw1(req, resp) {
        mw1Ran = true
    }

    let mw2Ran = false;
    function mw2(req, resp) {
        mw2Ran = true
        resp.end()
    }

    let mw3Ran = false;
    function mw3(req, resp) {
        mw3Ran = true
    }

    pipe.use(mw1)
    pipe.use(mw2)
    pipe.use(mw3)

    pipe(null,resp)

    test.expect(4)
    test.ok(resp.finished)
    test.ok(mw1Ran)
    test.ok(mw2Ran)
    test.ok(!mw3Ran)
    test.done()
}

module.exports.testLastFirstMiddlewares = function testLastFirstMiddlewares(test){
    const pipe = connect()
    const resp = new Resp()

    let mw1Ran = false;
    function mw1(req, resp) {
        mw1Ran = true
    }

    let mw2Ran = false;
    function mw2(req, resp) {
        mw2Ran = true
    }

    let mw3Ran = false;
    function mw3(req, resp) {
        mw3Ran = true
        resp.end()
    }

    pipe.use(mw1)
    pipe.use(mw2)
    pipe.use(mw3)

    pipe(null,resp)

    test.expect(4)
    test.ok(resp.finished)
    test.ok(mw1Ran)
    test.ok(mw2Ran)
    test.ok(mw3Ran)
    test.done()
}