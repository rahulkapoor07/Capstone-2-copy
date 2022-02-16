const app = require("./app");
const PORT = process.env.PORT || 4001;

app.listen(PORT, ()=>{
    console.log(`app has been connected to ${PORT} port`);
});