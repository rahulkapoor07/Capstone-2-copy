const express = require("express");
const app = express();
const ExpressError = require("./expressError");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const homeRouter = require("./routes/homes");
const agentsRouter = require("./routes/agents");
const {authenticateJWT} = require("./middleware/auth");
const path = require("path");
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(authenticateJWT);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"react-real-estate/build")));
}

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/homes", homeRouter);
app.use("/agents", agentsRouter);
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "react-real-estate/build/index.html"));
})

app.use((req, res, next)=>{
    return next(new ExpressError("Route Not Found", 404));
})

app.use((error, req, res, next)=>{
    let message = error.message;
    let status = error.status || 500;
    return res.status(status).json({message, status});
});

module.exports = app;