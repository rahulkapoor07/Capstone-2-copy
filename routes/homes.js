const express = require("express");
const router = new express.Router();
const {findLocation, buy, sold,rent, averageRate, mortgageCalc, savedHomeDetail} = require("../helpers/apiData");
const Home = require("../models/Home");
const ExpressError = require("../expressError");
const jsonSchema = require("jsonschema");
const addHomeSchema = require("../schemas/homeSchemas/addHomeSchema.json");
const addHomeUserSchema = require("../schemas/homeSchemas/addHomeUserSchema.json");
const removeHomeSchema = require("../schemas/homeSchemas/removeHomeSchema.json");
const {ensureLoggedIn} = require("../middleware/auth");
const db = require("../db");

router.post("/input-data", async (req, res, next)=>{
    try{
        const {input} = req.body;
        const response = await findLocation(input);
        res.json(response);
    }catch(e){
        console.error({"zipcode-error": e});
    }

});

router.post("/buy",ensureLoggedIn, async (req, res, next)=>{
    try{
        const {state_code, city} = req.body;
        const response = await buy(state_code, city);
        const favourites = [];
        const username = req.user.user.username;
        let filteredbuyHomes = response; 
        const favHomes = 
        await db.query(`SELECT home_property_id FROM users_homes WHERE user_username = $1`,[username]);
        favHomes.rows.map(data => favourites.push(data.home_property_id));
        for (let fav of favourites){
           filteredbuyHomes = filteredbuyHomes.filter(data => data.property_id !== fav);
        }
        return res.json(filteredbuyHomes);
    }catch(e){
        console.log(`buy`,e);
        return next(e);
    }
});

router.post("/savedHomes-details", async (req, res, next)=>{
    try{
        const {state_code, city, username } = req.body;
        const response = await buy(state_code, city);
        const favourites = [];
        const final = [];
        let singleHome;
        const favHomes = 
        await db.query(`SELECT home_property_id FROM users_homes WHERE user_username = $1`,[username]);
        favHomes.rows.map(data => favourites.push(data.home_property_id));
        for (let fav of favourites){
            singleHome = response.filter(data => data.property_id === fav);
            final.push(...singleHome);
        }
        return res.json(final);
    }catch(e){
        return next(e);
    }
});



router.post("/sold",ensureLoggedIn, async(req, res, next)=>{
    try{
        const {state_code, city} = req.body;
        const results = await sold(state_code, city);
        const favourites = [];
        const username = req.user.user.username;
        let filteredSoldHomes = results; 
        const favHomes = 
        await db.query(`SELECT home_property_id FROM users_homes WHERE user_username = $1`,[username]);
        favHomes.rows.map(data => favourites.push(data.home_property_id));
        for (let fav of favourites){
           filteredSoldHomes = filteredSoldHomes.filter(data => data.property_id !== fav);
        }
        return res.json(filteredSoldHomes);
    }catch(e){
        return next(e);
    }
});

router.post("/rent",ensureLoggedIn, async(req, res, next)=>{
    try{
        const {state_code, city} = req.body;
        const results = await rent(state_code, city);
        const username = req.user.user.username;
        let allHomes = results;
        const savedHomes = 
        await db.query(`SELECT home_property_id FROM users_homes WHERE user_username = $1`,[username]);
        for(let home of savedHomes.rows){
            allHomes = allHomes.filter(data => data.property_id !== home.home_property_id);
        }
        return res.json(allHomes);
    }catch(e){
        console.log(e);
        return next(e);
    }
});

router.get("/average-rate", async (req, res, next)=>{
    try{
        const results = await averageRate("95993");
        res.json(results);
    }catch(e){
        return next(e);
    }
});

router.post("/mortgage-calculator", async (req, res, next)=>{
    try{
        const {percent_tax_rate, year_term,percent_rate,down_payment,monthly_home_insurance,
            price} = req.body;
        const results = await mortgageCalc(percent_tax_rate, year_term,percent_rate,down_payment,monthly_home_insurance,
            price);
        res.json(results);
    }catch(e){
        return next(e);
    }
});

router.get("/all-homes", async (req, res, next)=>{
    try{
        const response = await Home.allHomes();
        return res.json({homes : response});
    }catch(e){
        return next(e);
    }
});

router.post("/add-home", async (req, res, next)=>{
    try{
        const validation = jsonSchema.validate(req.body, addHomeSchema);
        if (!validation.valid){
            const errs = validation.errors.map(e => e.stack);
            return next(new ExpressError(errs, 403));
        }
        const {property_id, status_code} = req.body;
        const response = await Home.addHome(property_id, status_code);
        return res.json({message : "home added in db", response });
    }catch(e){
        return next(e);
    }
});

router.post("/add-home-user" , async (req, res, next)=>{
    try{
        const validation = jsonSchema.validate(req.body, addHomeUserSchema);
        if (!validation.valid){
            const errs = validation.errors.map(e => e.stack);
            return next(new ExpressError(errs, 403));
        }
        const {user_username, home_property_id} = req.body;
        const response = await Home.addHomeUser(user_username, home_property_id);
        return res.json({"message":"home added into user profile", response})
    }catch(e){
        return next(e);
    }
});

router.post("/savedHomeDetail" , async (req, res, next)=>{
    try{
        const {property_id} = req.body;
       const results = await savedHomeDetail(property_id);
       return res.json(results);
    }catch(e){
        return next(e);
    }
});

router.post("/savedHomesDetails" , async (req, res, next)=>{
    try{
        const {username} = req.body;
        const final = [];
        const results = 
        await db.query(`SELECT home_property_id FROM users_homes WHERE user_username = $1`,[username]);
        for(let home of results.rows){
           final.push(await savedHomeDetail(home.home_property_id));
        }

       return res.json(final);
    }catch(e){
        return next(e);
    }
});

router.delete("/remove-home-from-user-db", async (req, res, next)=>{
    try{
        const {property_id, username} = req.body;
        await Home.removeHomeUser(property_id, username);
        return res.json({"message":"home removed from users profile"})
    }catch(e){
        return next(e);
    }
 
});

module.exports = router;