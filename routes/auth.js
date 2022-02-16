const express = require("express");
const authSchema = require("../schemas/userAuth.json");
const registerSchema = require("../schemas/userRegister.json");
const jsonSchema = require("jsonschema");
const ExpressError = require("../expressError");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {SECRET_KEY} = require("../config");

const router = new express.Router();

router.post("/login", async (req, res, next)=>{
    try{
        const validator = jsonSchema.validate(req.body, authSchema);
        if (!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            return next(new ExpressError(errs, 403));
        }
        const {username, password} = req.body;
        const user = await User.authenticate(username, password);
        const token = jwt.sign({user}, SECRET_KEY);
        return res.json({token});
    }catch(e){
        console.log(e);
        return next(e);
    }
});

router.post("/register", async (req, res, next)=>{
    try{
        const validator = jsonSchema.validate(req.body, registerSchema);
        if (!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            return next(new ExpressError(errs, 403));
        }
        const {username, first_name, last_name, email, password} = req.body;
        const user = await User.register(username, first_name, last_name, email, password);
        const token = jwt.sign({user}, SECRET_KEY);
        return res.status(201).json({token});
    }catch(e){
        return next(e);
    }
});

module.exports = router;