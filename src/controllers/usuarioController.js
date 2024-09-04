const token = require('../util/token');
const usuarioModel = require('../models/usuarioModel');

exports.entrar = async(nick)=>{
    let resp = await usuarioModel.registrarUsuario(nick);
    if(resp.insertedId){
        return {
            "iduser": resp.insertedId,
            "token": await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g,''),nick),
            "nick": nick
        }
    }
};
exports.sair = async(_id)=>{
    let resp = await usuarioModel.sair(_id);
    if(resp.deletedCount == 1){
        return {"msg": "Saiu com sucesso."};
    }
    else
        return {"error": "Não foi possível encontrar o usuário"}
}