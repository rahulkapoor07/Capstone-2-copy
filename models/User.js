const db = require("../db");
const bcrypt = require("bcrypt");
const ExpressError = require("../expressError");
const {BCRYPT_WORK_FACTOR} = require("../config");
const {sqlForPartialUpdate} = require("../helpers/sqlUpdate");



class User {
    static async authenticate(username, password){
        const results = await db.query(`SELECT username,password FROM users WHERE username=$1`, [username]);
        const user = results.rows[0];
        if (user){
            if(await bcrypt.compare(password, user.password)){
                return user;
            }else{
                throw new ExpressError(`Please enter valid username/password`, 404);    
            }
        }else{
            throw new ExpressError(`Please enter valid username/password`, 404);
        }
    }

    static async register(username, first_name, last_name, email, password){
        const checkDuplicate = await db.query(`SELECT * FROM users WHERE username = $1`,[username]);
        if(checkDuplicate.rows[0]){
            throw new ExpressError("username already exists", 404);
        }
        const hashed_password = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const results = await db.query(`INSERT INTO users (username, first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4, $5) RETURNING username`, [username, first_name, last_name, email, hashed_password]);
        const user = results.rows[0];
        return user;
    }

    static async getAllUser(){
        const results = await db.query(`SELECT username, first_name, last_name, email FROM users`);
        return results.rows;
    }

    static async getUser(username){
        const result1 = await db.query(`SELECT username, first_name, last_name, 
        email FROM users WHERE username = $1`, [username]);
        const user = result1.rows[0];
        const result2 = await db.query(`SELECT uh.home_property_id, h.status_code FROM users AS u
            INNER JOIN users_homes AS uh ON u.username = uh.user_username INNER JOIN
            homes AS h ON h.property_id = uh.home_property_id WHERE u.username = $1`,[username]);
        const homes = result2.rows;
        if (!user) throw new ExpressError(`Username: ${username} not found`, 404);
        return {...user, homes};
    }

    static async getUserHomes(username){
        const results = await db.query(`SELECT uh.home_property_id, h.status_code FROM users AS u
            INNER JOIN users_homes AS uh ON u.username = uh.user_username INNER JOIN
            homes AS h ON h.property_id = uh.home_property_id WHERE u.username = $1`,[username]);
        return results.rows;
    }

    static async update(username, data) {
        if (data.password) {
          data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }
    
        const { setCols, values } = sqlForPartialUpdate(
            data);
            // ,{
            //   firstName: "first_name",
            //   lastName: "last_name"
            // });
        const usernameVarIdx = "$" + (values.length + 1);
    
        const querySql = `UPDATE users 
                          SET ${setCols} 
                          WHERE username = ${usernameVarIdx} 
                          RETURNING username,
                                    first_name,
                                    last_name,
                                    email`;
        const result = await db.query(querySql, [...values, username]);
        const user = result.rows[0];
    
        if (!user) throw new ExpressError(`No user: ${username}`, 404);
    
        delete user.password;
        return user;
        
    }

    static async remove(username) {
        let result = await db.query(
              `DELETE
               FROM users
               WHERE username = $1
               RETURNING username`,
            [username],
        );
        const user = result.rows[0];
    
        if (!user) throw new ExpressError(`No user: ${username}`, 403);
      }
}

module.exports = User;