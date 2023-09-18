const jwt = require('jsonwebtoken');

module.exports.sendToken = async (user) => {
    let id = user.id.toString();
    let token = jwt.sign({id: id}, 'cristianoronaldogreatestofalltime',{
        expiresIn: '7d',
        
    })
   return token;
}

module.exports.sendEcryptedEmailToken = async (email) => {
    return jwt.sign({email: email}, 'cristianoronaldogreatestofalltime', {
        expiresIn: "1d"
    })
}