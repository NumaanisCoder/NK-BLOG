const jwt = require('jsonwebtoken');

module.exports.sendToken = async (user, res) => {
    let id = user.id.toString();
    let token = jwt.sign({id: id}, 'cristianoronaldogreatestofalltime',{
        expiresIn: '7d',
        
    })
   res.cookie('token',token, {
        domain:'nkblogs',
        maxAge: 900000
   })
}