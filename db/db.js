import { MongoClient } from 'mongodb';

const dbName = 'TodoList';

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
            await client.db(dbName).createCollection('tasks'); // Create a tasks collection to initialize the database
            console.log(`Database '${dbName}' created.`);
        }

        console.log('Connected to MongoDB.');
        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

export { connectToMongoDB };
