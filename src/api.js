var express = require('express');
var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const router = express.Router();

const token = require('./util/token');

app.get('/', (req, res)=>{
    res.status(200).send("<h1>API - CHAT</h1>");
});

app.get('/sobre',(req, res, next)=>{
    res.status(200).send({
        "nome":"API - CHAT",
        "versão":"0.1.0",
        "autor":"Airon Lazzaretti"
    });
});

app.post("/entrar",router.post("/entrar", async(req,res,next)=>{
    const usuarioController = require("./controllers/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

// app.use("/salas",router.get("/salas",async(req,res,next)=>{
//     const salaController = require("./controllers/salaController");
//     let resp = await salaController.get();
//     res.status(200).send(resp);
// }));

const salas = express.Router();

salas.get("/",async(req,res,next)=>{
    if(token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)){
        const salaController = require("./controllers/salaController");
        let resp = await salaController.get();
        res.status(200).send(resp);
    }
    else res.status(400).send({error:"usuario nao autorizado"});
});

app.use("/salas", salas);

module.exports = app;