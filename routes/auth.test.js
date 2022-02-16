process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");
const {SECRET_KEY} = require("../config")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const BCRYPT_WORK_FACTOR = 1;
let testingUser1;
let testingUser2;
let testingUserToken1;
let testingUserToken2;
beforeEach( async ()=>{
    const hashed_password = await bcrypt.hash("secret", BCRYPT_WORK_FACTOR);
    const results1 = await db.query(`INSERT INTO users (username, password, first_name, last_name, email)
    VALUES ('testuser1',$1, 'test','user','testuser1@gmail.com') RETURNING username,
    first_name, last_name, email`,[hashed_password]);
    const results2 = await db.query(`INSERT INTO users (username, password, first_name, last_name, email)
    VALUES ('testuser2',$1, 'test','user','testuser2@gmail.com') RETURNING username,
    first_name, last_name, email`,[hashed_password]);
    testingUser1 = results1.rows[0];
    testingUser2 = results2.rows[0];
    testingUserToken1 = jwt.sign({user : testingUser1}, SECRET_KEY);
    testingUserToken2 = jwt.sign({user : testingUser2}, SECRET_KEY);
})

afterEach(async ()=>{
    await db.query(`DELETE FROM users`);
})

afterAll(async ()=>{
    await db.end();
})

describe("post/auth/login", ()=>{
    test("login success", async ()=>{
        const res = await request(app).post("/auth/login").send({"username":"testuser1","password":"secret"});
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
        .send({"username":"rahulkapoor", "password":"rahulkapoor","first_name":"rahul","last_name":"kapoor",
        "email":"rahulkapoor@gmail.com"});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expect.objectContaining({"token":expect.any(String)}));
    });
    test("gives error =>having duplicate user", async ()=>{
        const res = await request(app).post("/auth/register")
        .send({"username":"testuser1", "password":"secret","first_name":"rahul","last_name":"kapoor",
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