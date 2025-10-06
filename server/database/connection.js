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
        await mongoose.connect('mongodb+srv://jesusmorales245335:Hl5hnSbHVTFs10j7@cluster.fs2csfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster');
        console.log(`Connected to the database`);
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
    }

};

export { connectToDatabase };