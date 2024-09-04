const {MongoClient, ObjectId} = require('mongodb');

let singleton;

async function connect(){
    if(singleton) return singleton;

    const client = new MongoClient(process.env.DB_CONNECTION_STRING);
    await client.connect();
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    singleton = client.db(process.env.DB_DATABASE);
    return singleton;
}

let findAll = async(collection)=>{
    const db = await connect();
    return await db.collection(collection).find().toArray();
}

async function insertOne(collection, object){
    const db = await connect();
    return db.collection(collection).insertOne(object);
}

async function findOne(collection, _id){
    const db = await connect();
    let obj = await db.collection(collection).find({
        '_id': new ObjectId(_id)
    }).toArray();
    if(obj){
        return obj[0];
    }
    else 
        return false;
}

async function updateOne(collection, object, param){
    const db = await connect();
    let result = await db.collection(collection).updateOne(param, { $set: object });
    return result;
}

async function deleteOne(collection, _id){
    const db = await connect();
    let resp = await db.collection(collection).deleteOne({
        '_id': new ObjectId(_id)
    });
    return resp;
}

module.exports = {findAll, insertOne, findOne, updateOne, deleteOne};