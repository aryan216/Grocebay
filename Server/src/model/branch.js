import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
    deliveryPartners:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryPartner",
        }
    ],

})    

const Branch = mongoose.model("Branch", branchSchema);
export default Branch