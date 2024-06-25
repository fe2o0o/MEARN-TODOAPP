import mongoose from "mongoose";

export const  Connection = () => {
    mongoose.connect(`${process.env.Data_Base_URI}`).then(() => {
        console.log("dbConnected");
    }).catch((err) => {
        console.log(err);
    })
}