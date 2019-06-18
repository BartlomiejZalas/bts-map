import { InsertBts } from "./dao";
import { Bts } from "./domain";
import { MongoClient, MongoClientOptions } from 'mongodb';

const url = "mongodb://localhost:27017/";

interface MongoLocationFormat {
    type: string,
    coordinates: number[]
}

interface MongoBtsFromat {
    name: string
    location: MongoLocationFormat,
}

const convertBtsToDocument = (bts:Bts): MongoBtsFromat => {
    return {
        name: bts.name,
        location: {
            type: "Point",
            coordinates: [bts.lng, bts.lat]
        }
    };
};

export const insertBtses: InsertBts = async(btses: Bts[]) => {

    const options: MongoClientOptions = {};
    const mongoClient = await MongoClient.connect(url, options);
    const database = mongoClient.db("btsMap");
    const btsCollection = database.collection('bts');

    const documents: MongoBtsFromat[] = btses.map(b => convertBtsToDocument(b));
    const result = await btsCollection.insertMany(documents);

    await mongoClient.close();

    console.log(result);
};