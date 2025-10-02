import { MongoClient } from "mongodb";
import { uri } from "./atlas_uri.js";

const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log(`Connected to the database`);
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
    }

};

async function main() {
    try {
        await connectToDatabase();
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
    } finally {
        await client.close();
    }

}

main();