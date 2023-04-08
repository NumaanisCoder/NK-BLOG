const jwt = require('jsonwebtoken');

module.exports.sendToken = async (user, res) => {
    let id = user.id.toString();
    let token = jwt.sign({id: id}, 'cristianoronaldogreatestofalltime',{
        expiresIn: '7d',
        domain:'nkblogs.ml',
        maxAge: 900000
    })
   return token;
}