const db = require("../db");
const ExpressError = require("../expressError");
class Home {

    static async allHomes(){
        const result = await db.query(`SELECT * FROM homes`);
        return result.rows;
    }

    static async addHome (property_id, status_code){
        const check_duplicate = await db.query(`SELECT * FROM homes WHERE property_id = $1`,[property_id]);
        if(check_duplicate.rows.length){
            throw new ExpressError(`Already added into db`, 403);
        }
        const results = await db.query(`INSERT INTO homes (property_id, status_code) 
        VALUES ($1, $2) RETURNING *`,[property_id, status_code]);
        return results.rows[0];
    }

    static async addHomeUser (user_username, home_property_id){
        const check_duplicate = await db.query(`SELECT * FROM users_homes WHERE user_username = $1 
        AND home_property_id = $2`,[user_username, home_property_id]);
        if(check_duplicate.rows.length){
            throw new ExpressError(`already added into relationship db`, 403);
        }
        const results = await db.query(`INSERT INTO users_homes (user_username, home_property_id) 
        VALUES ($1, $2) RETURNING *`,[user_username, home_property_id]);

        // const homesResults = await db.query(`SELECT * FROM`)
        return results.rows[0];
    }

    static async removeHomeUser(property_id, username){
        await db.query(`DELETE FROM users_homes WHERE home_property_id =$1 AND user_username = $2`, 
        [property_id, username]);
    }
}

module.exports = Home;