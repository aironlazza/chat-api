require("dotenv").config();
const app = require("../src/api");

app.use((req,res,next)=>{
    next();
});

let port = process.env.PORT || 3001;
app.listen(port);
console.log(`listening on ${port}`);
