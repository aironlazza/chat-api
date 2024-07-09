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
module.exports = {findAll}