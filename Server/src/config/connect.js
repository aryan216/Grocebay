import mongoose from "mongoose"

export const connect = async (uri) => {
    try {
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}
