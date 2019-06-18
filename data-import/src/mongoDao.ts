import { InsertBts } from "./dao";
import { Bts } from "./domain";
import { MongoClient, MongoClientOptions } from 'mongodb';

const url = "mongodb://localhost:27017/";

export const insertBtses: InsertBts = async(btses: Bts[]) => {

    const options: MongoClientOptions = {};
    const mongoClient = await MongoClient.connect(url, options);
    const database = mongoClient.db("btsMap");
    const btsCollection = database.collection('bts');
    const result = await btsCollection.insertMany(btses);
    await mongoClient.close();

    console.log(result);
};