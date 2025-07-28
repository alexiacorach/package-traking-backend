import mongoose, { Schema, Document } from "mongoose";


// Definimos una interfaz para el tipo de Usuario
export interface IUser extends Document {
    name : string;
    email : string;
    password : string;
    createdAT: Date;
}

const UserSchema : Schema = new Schema ({
    name : {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // no permite repetidos
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    creatdeAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model<IUser>("User", UserSchema);