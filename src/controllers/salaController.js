// exports.get = async(req,res)=>{
//     return {
//         "status":"OK",
//         "controller":"sala"
//     }
// }   
exports.get=()=>{
    let salaModel = require('../models/salaModel');
    return salaModel.listarSalas()
}