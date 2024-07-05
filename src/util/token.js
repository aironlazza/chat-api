const jwt = require('jsonwebtoken');

const checkToken = async (token, id, key) => jwt.verify(token, key, (err, decoded)=>{
    //fazer
});

const setToken = async (id,key) =>{
    console.log(id);
    if(id){
        return jwt.sign({id}, key, {expiresIn: 28800});
    }
    return false;
}