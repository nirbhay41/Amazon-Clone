import { MongoClient } from "mongodb";

const { MONGODB_URI_LOCAL, MONGODB_DB_LOCAL } = process.env;

if (!MONGODB_URI_LOCAL) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!MONGODB_DB_LOCAL) {
    throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

const client = new MongoClient(MONGODB_URI_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export async function connectToDatabase() {
    if (!client.isConnected()) await client.connect();
    const db = client.db(MONGODB_DB_LOCAL);
    return { client, db };
}