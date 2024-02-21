import { MongoClient } from 'mongodb';
import { collections, dbName } from '../utils/constants.js';


const connectToMongoDB = async () => {
    const client = new MongoClient(process.env.MONGO_URL);
    try {
        // Connect to MongoDB
        await client.connect();

        // Check if the database exists
        const dbList = await client.db().admin().listDatabases();
        const dbExists = dbList.databases.some(db => db.name === dbName);

        // If the database does not exist, create it
        if (!dbExists) {
            await client.db(dbName).createCollection(collections.TASKS); // Create a tasks collection to initialize the database
            console.log(`Database '${dbName}' created.`);
        }

        console.log('Connected to MongoDB.');
        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
const getCollection = async (name) => {
    try {
        const db = await connectToMongoDB()
        return db.collection(name);
    } catch(error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }

}

export { connectToMongoDB, getCollection };
