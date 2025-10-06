import { mongoose } from "mongoose";
import { uri } from "./atlas_uri.js";

/**
 * @async
 * @function connectToDatabase
 * @summary Establishes the connection with the MongoDB database.
 * @description Uses the imported connection URI to connect the application to the database
 * via Mongoose. It logs a message to the console on successful connection,
 * or a detailed error if it fails.
 */
async function connectToDatabase() {
    try {
        await mongoose.connect('uri');
        console.log(`Connected to the database`);
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
    }

};

export { connectToDatabase };