import mongoose from 'mongoose';

const DBConnetction = async () => {
    try {
        await mongoose.connect(process.env.ConnetionDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Hello ya saloka");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

export default DBConnetction;
