
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");
const ExpressError = require("../expressError");


function authenticateJWT(req, res, next){
    try{
        const payload = jwt.verify(req.headers.authorization, SECRET_KEY);
        req.user = payload;
        return next();
    }catch(e){
        return next();
    }
}

function ensureLoggedIn(req, res, next){
    if(!req.user){
        const err = new ExpressError("Please login first", 403); 
        return next(err);
    }else{
        return next();
    }
}

module.exports = {authenticateJWT, ensureLoggedIn};