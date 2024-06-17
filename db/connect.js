import mongoose from 'mongoose';
const uri = "mongodb+srv://dbuser:tTzQxBVQQspmfGw8@cluster0.uvce72m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async () => {
    try{
        await mongoose.connect(uri)
            console.log("Connected to DB")
    } catch(error){
        console.log("Error in connecting to DB", error.message);
    }
}

export default connectDB;