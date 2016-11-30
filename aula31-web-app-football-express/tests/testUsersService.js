const usersService = require('./../model/usersService.js')

module.exports.testValidUser = function(test){
    usersService.authenticate('manel', '123', (err, user) => {
        test.ok(!err)
        test.equals(user.fullname, 'Manel Maria')
        test.done()
    })
}

module.exports.testUnknownUser = function(test){
    usersService.authenticate('xpto', '123', (err, user) => {
        test.ok(!user)
        test.equals(err.message, 'User does not exists')
        test.done()
    })
}

module.exports.testWrongPass = function(test){
    usersService.authenticate('manel', '4321', (err, user) => {
        test.ok(!user)
        test.equals(err.message, 'Invalid password')
        test.done()
    })
}