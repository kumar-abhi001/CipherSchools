import mongoose from 'mongoose';


const ConnectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/cipher-school`);
        console.log("DB is connected");
    } catch (error) {
        return console.log("Error while connecting to DB:", error);
    }
}

export { ConnectDB };