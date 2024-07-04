import mongoose from "mongoose";

export const connectDatabase = () => {
    mongoose.connect("mongodb+srv://sarthaksood09:VKP2eUnfR0HN2lzL@cluster0.sjhk127.mongodb.net/?retryWrites=true&w=majority", {
        dbName: "QuadB"
    }).then(() => {
        console.log("connected to database")
    }).catch((e) => {
        console.log(e);
    })
}