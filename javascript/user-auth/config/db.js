import mongoose from "mongoose";

export const configureDB = async () => {
    const dbUrl=process.env.DB_URL;
    try {
        await mongoose.connect(dbUrl);
        console.log('Connected to DB');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};