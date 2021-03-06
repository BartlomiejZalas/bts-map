import { InsertBts } from "./dao";
import { Bts } from "./domain";
import { MongoClient } from 'mongodb';

const url = "mongodb://localhost:27017/";

interface MongoLocationFormat {
    type: string,
    coordinates: number[]
}

interface MongoBtsFormat {
    name: string
    location: MongoLocationFormat,
}

const convertBtsToDocument = (bts: Bts): MongoBtsFormat => {
    return {
        name: bts.name,
        location: {
            type: "Point",
            coordinates: [bts.lng, bts.lat]
        }
    };
};

export const insertBtses: InsertBts = async (btses: Bts[]): Promise<void> => {

    const mongoClient = await MongoClient.connect(url, {});
    const database = mongoClient.db("btsMap");
    const btsCollection = database.collection('bts');

    const documents: MongoBtsFormat[] = btses.map(b => convertBtsToDocument(b));
    await btsCollection.insertMany(documents);

    await mongoClient.close();
};