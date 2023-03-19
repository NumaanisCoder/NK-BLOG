const ErrorHandler = require("../utils/ErrorHandler");


module.exports.isAuthenticated = async (req,res, next)=>{
    const {token} = req.cookies;
    if(token){
        next();
    }else{
        return next(new ErrorHandler(401, "LOG IN REQUIRED"));
    }
}