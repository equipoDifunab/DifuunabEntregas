import mongosee from 'mongoose';

export const connectDB = async () => {
    try{
        await mongosee.connect("mongodb://localhost:27017/Difunab");
        console.log('MongoDB connected');
    } catch (error){
        console.error('Error connecting to MongoDB:', error);        
    }
};