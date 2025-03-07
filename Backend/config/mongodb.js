import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DATA BASE CONNECTED")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/DOCTO`)
}

export default connectDB