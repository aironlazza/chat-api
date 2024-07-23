const db = require("./db");

let listarSalas = async ()=>{
    let salas = await db.findAll("salas");
    return salas;
};

let buscarSala = async (idsala)=>{
    return await db.findOne("salas", idsala);
}

let atualizarMensagens = async(sala)=>{
    return await db.updateOne("salas", sala, {_id:sala._id});
}

module.exports = {listarSalas, buscarSala}