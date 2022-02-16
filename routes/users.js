const express = require("express");
const User = require("../models/User");
const router = new express.Router();
const ExpressError = require("../expressError");
const userPatchSchema = require("../schemas/userPatch.json");
const jsonSchema = require("jsonschema");
const {ensureLoggedIn} = require("../middleware/auth"); 

router.get("/",ensureLoggedIn, async(req, res, next)=>{
    try{
        const users = await User.getAllUser();
        return res.json({users});
    }catch(e){
        return next(e);
    }
});

router.get("/:username",ensureLoggedIn, async (req, res, next)=>{
    try{
    const {username} = req.params;
    const user = await User.getUser(username);
    return res.json({user});
    }catch(e){
        return next(e);
    }
});

router.post("/saved/homes", async (req, res, next)=>{
    try{
        const {username} = req.body;
        const response = await User.getUserHomes(username);
        return res.json(response);
    }catch(e){
        return next(e);
    }
})

router.patch("/:username",ensureLoggedIn, async (req, res, next)=>{
    try{
        const validation = jsonSchema.validate(req.body, userPatchSchema);
        if (!validation.valid){
            const errs = validation.errors.map(e => e.stack);
            return next(new ExpressError(errs, 403));
        }
        const user = await User.update(req.params.username, req.body);
        return res.json({user})
    }catch(e){
        return next(e);
    }
});

router.delete("/:username",ensureLoggedIn, async (req, res, next)=>{
    try{
        const {username} = req.params;
        await User.remove(username);
        return res.json({msg:"deleted"});
    }catch(e){
        return next(e);
    }
});

module.exports = router;