// lib/dbConnect.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    // Check if we have a connection to the database or if it's currently connecting or disconnecting
    if (connection.isConnected) {
        console.log("Already Connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '');

        connection.isConnected = db.connections[0].readyState;

        console.log("DB Connected Successfully");
        
        // Handle connection events
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
            connection.isConnected = 0;
        });

        // Handle app termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('Mongoose connection closed due to app termination');
            process.exit(0);
        });

    } catch (error: any) {
        console.error("Database Connection Failed", error.message, error.stack);

        // Reset connection state on error
        connection.isConnected = 0;

        if (process.env.NODE_ENV === "production") {
            process.exit(1);
        } else {
            // In development, throw the error so it can be handled
            throw error;
        }
    }
}

export default dbConnect;
