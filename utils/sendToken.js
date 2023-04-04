const jwt = require('jsonwebtoken');

module.exports.sendToken = async (user, res) => {
    let id = user.id.toString();
    let token = jwt.sign({id: id}, process.env.JWT_SECRET_KEY,{
        expiresIn: '7d'
    })
    res.cookie('token', token, {
        expires: new Date(Date.now() + 5 * 5 * 60 * 60 * 1000),
        secure: true
    })
    
}