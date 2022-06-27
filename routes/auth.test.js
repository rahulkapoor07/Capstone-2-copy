process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const {SECRET_KEY} = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const BCRYPT_WORK_FACTOR = 1;
let testingUser1;
let testingUser2;
let testingUserToken1;
let testingUserToken2;
let user_home1;
let user_home2;
beforeEach( async ()=>{
    const hashed_password = await bcrypt.hash("secret", BCRYPT_WORK_FACTOR);
    const results1 = await db.query(`INSERT INTO users 
    (username, first_name, last_name, email, password)
    VALUES ('rahulkapoor', 'rahul','kapoor','rahulkapoor@gmail.com',$1) RETURNING username,
    first_name, last_name, email`,[hashed_password]);
    const results2 = await db.query(`INSERT INTO users 
    (username, password, first_name, last_name, email)
    VALUES ('rohitkapoor',$1, 'rohit','kapoor','rohitkapoor@gmail.com') RETURNING username,
    first_name, last_name, email`,[hashed_password]);
    testingUser1 = results1.rows[0];
    testingUser2 = results2.rows[0];
    testingUserToken1 = jwt.sign({user : testingUser1}, SECRET_KEY);
    testingUserToken2 = jwt.sign({user : testingUser2}, SECRET_KEY);
    const homeresults1 = await db.query(`INSERT INTO users_homes (id, user_username, home_property_id)
    VALUES ('1', ${testingUser1.username}, '123456') RETURNING *`);
    const homeresults2 = await db.query(`INSERT INTO users_homes (id, user_username, home_property_id)
    VALUES ('2', ${testingUser2.username}, '121212') RETURNING *`);
    user_home1 = homeresults1.rows[0];
    user_home2 = homeresults2.rows[0];
});

afterEach(async ()=>{
    await db.query(`DELETE FROM users`);
    await db.query(`DELETE FROM users_homes`);
})

afterAll(async ()=>{
    await db.end();
});


describe("post/auth/login", ()=>{
    test("login success", async ()=>{
        const res = await request(app).post("/auth/login").send({username:"rahulkapoor",password:"secret"});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({"token": expect.any(String)}));
    });
    test("login fail", async ()=>{
        const res = await request(app).post("/auth/login").send({"username":"abc","password":"secret123"});
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({"message": "Please enter valid username/password", "status": 404});

    });
});

describe("post/auth/register", ()=>{
    test("register success", async ()=>{
        const res = await request(app).post("/auth/register")
        .send({"username":"abc", "password":"abc","first_name":"rahul","last_name":"kapoor",
        "email":"rahulkapoor@gmail.com"});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expect.objectContaining({"token":expect.any(String)}));
    });
    test("gives error =>having duplicate user", async ()=>{
        const res = await request(app).post("/auth/register")
        .send({"username":"rahulkapoor", "password":"secret","first_name":"rahul","last_name":"kapoor",
        "email":"rahulkapoor@gmail.com"});
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({"message":"username already exists","status": 404});
    });
})


describe("get/users", ()=>{
    test("get all users", async ()=>{
        const response = await request(app).get("/users").set({"authorization": testingUserToken1});
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({users : [testingUser1, testingUser2]});
    })
});

describe("get/users/:username", ()=>{
    test("get single user", async()=>{
        const res = await request(app).get(`/users/${testingUser1.username}`).set({"authorization": testingUserToken1});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({user : {...testingUser1, homes : []}});
    });
    test("gives error if wrong username", async()=>{
        const res = await request(app).get(`/users/abcd`).set({"authorization": testingUserToken1});
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({"message":"Username: abcd not found","status": 404})
    });
});

describe("/saved/homes",()=>{
    test("get all saved homes", async()=>{
        const res = await request(app).post("/users/saved/homes").send({"username": testingUser1})
        .set({"authorization": testingUserToken1});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });
});

describe("patch/users/:username", ()=>{
    test("success in patch request", async ()=>{
        const res = await request(app).patch(`/users/${testingUser1.username}`).send({"first_name": "tester"})
        .set({"authorization": testingUserToken1});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({user : {username : testingUser1.username, first_name: "tester",
        last_name:testingUser1.last_name,email:testingUser1.email}})
    })
    test("error => with wrong username",async()=>{
        const res = await request(app).patch(`/users/abcd`).send({"first_name": "tester"})
        .set({"authorization": testingUserToken1});
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({"message":"No user: abcd","status": 404});
    })
});

describe("delete/users/:username", ()=>{
    test("delete a user", async ()=>{
        const res = await request(app).delete(`/users/${testingUser1.username}`)
        .set({"authorization": testingUserToken1});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({msg:"deleted"});
    });

    test("show error if username not found", async()=>{
        const res = await request(app).delete(`/users/peter`)
        .set({"authorization": testingUserToken1});
        expect(res.statusCode).toBe(403);
        expect(res.body).toEqual({"message":"No user: peter","status": 403});
    })
})