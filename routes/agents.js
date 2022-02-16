const express = require("express");
const router = new express.Router();
const {agents} = require("../helpers/apiData");

router.post("/agents-search", async (req, res ,next)=>{
    try{
        const {state_code, city} = req.body;
        const response =  await agents(state_code, city);
        return res.json(response);
    }catch(e){
        return next(e);
    }
})

module.exports = router;