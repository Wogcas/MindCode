import { mongoose } from "mongoose";
import { uri } from "./atlas_uri.js";

async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log(`Connected to the database`);
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
    }

};

export { connectToDatabase };