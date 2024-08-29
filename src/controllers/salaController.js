// exports.get = async(req,res)=>{
//     return {
//         "status":"OK",
//         "controller":"sala"
//     }
// }
let salaModel = require('../models/salaModel');

exports.get=async()=>{
    return await salaModel.listarSalas();
}

exports.entrar = async(iduser, idsala)=>{
    const sala = await salaModel.buscarSala(idsala);
    console.log(sala)
    let usuarioModel = require('../models/usuarioModel');
    let user = await usuarioModel.buscarUsuario(iduser);
    user.sala = {
        _id : sala._id,
        nome : sala.nome,
        tipo: sala.tipo
    };
    if(await usuarioModel.alterarUsuario(user)){
        return {
            status : "OK",
            timestamp : Date.now()
        };
    }   
    else return false;
}

exports.enviarMensagem = async(nick, msg, idsala) =>{
    const sala = await salaModel.buscarSala(idsala);
    if(!sala.msgs){
        sala.msgs = [];
    }
    timestamp = Date.now();
    sala.msgs.push({
        timestamp : timestamp,
        msg : msg,
        nick : nick
    });
    let resp = await salaModel.atualizarMensagens(sala);
    return {
        status : "OK",
        timestamp : timestamp
    }
}

exports.buscarMensagens = async(idsala,timestamp)=>{
    let mensagens = await salaModel.buscarMensagens(idsala,timestamp);
    if(!mensagens[0]){
        return {
            "error":"Não há mensagens ainda. Envie uma mensagem para começar."
        }
    }
    return {
        "timestamp" : mensagens[mensagens.length - 1].timestamp,
        "msgs" : mensagens
    }
}