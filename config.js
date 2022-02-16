const BCRYPT_WORK_FACTOR = 12;
const SECRET_KEY = "secret!123";
require("dotenv").config();
const proConfig =  process.env.DATABASE_URL;
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.
PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
let DB_URI;

if(process.env.NODE_ENV === "production"){
    DB_URI = proConfig;
}else if (process.env.NODE_ENV === "test"){
    DB_URI = "postgresql:///real_estate_test";
} else{
    DB_URI = devConfig;
}


module.exports = {SECRET_KEY, BCRYPT_WORK_FACTOR, DB_URI};