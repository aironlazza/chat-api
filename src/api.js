var express = require('express');
var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const router = express.Router();
app.use('/', router.get('/', (req, res)=>{
    res.status(200).send("<h1>API - CHAT</h1>");
}));

module.exports=app;

app.use('/',router.get("/sobre",(req, res, next)=>{
    res.status(200).send({
        "nome":"API - CHAT",
        "versão":"0.1.0",
        "autor":"Airon Lazzaretti"
    });
}));

module.exports = app;