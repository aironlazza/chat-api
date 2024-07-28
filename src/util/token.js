const jwt = require('jsonwebtoken');

const checkToken = async(token, id, key) => jwt.verify(token, key, (err, decoded) => {
        if(decoded){
            console.log("decoded: " + decoded.id);
            console.log("id: "+id);
            if(decoded.id == id)
                console.log("usuário autorizado")
                return true;
        }
        else console.log("erro: "+err);
        return false;
    });

const setToken = async (id,key) =>{
    if(id){
        return jwt.sign({id}, key, {expiresIn: 28800});
    }
    return false;
}
module.exports = {checkToken, setToken};