import mongoose, { Document, Schema } from "mongoose";

//package states
export enum packageState {
    Pending = "pending",
    InTransit = "in_transit",
    Delivered = "delivered",
}

//interface mongoose doc
export interface IPackage extends Document {
    origin: string;
    destination: string;
    status: packageState;
    client: mongoose.Types.ObjectId;
    delivery?: mongoose.Types.ObjectId;
    emission: Date;
}

const packageSchema: Schema = new Schema(
    {
        origin: {
            type: String,
            requires: true,
        }, 
        destination: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(packageState),
            
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        delivery: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps :{ createdAt: "emission", updatedAt: false},
    }
)

const PackageModel = mongoose.model<IPackage>("Package", packageSchema);
export default PackageModel;