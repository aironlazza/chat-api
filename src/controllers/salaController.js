// exports.get = async(req,res)=>{
//     return {
//         "status":"OK",
//         "controller":"sala"
//     }
// }
let salaModel = require('../models/salaModel');
exports.get=()=>{
    return salaModel.listarSalas();
}