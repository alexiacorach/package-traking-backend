import mongoose, { Schema, Document } from "mongoose";


// Definimos una interfaz para el tipo de Usuario
export interface IUser extends Document {
    name : string;
    email : string;
    password : string;
    createdAt: Date;
    role: "client" | "admin" | "delivery"
}

const UserSchema : Schema = new Schema<IUser> ({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum : ["client", "admin", "delivery"],
        default: "client",
        required: true
    }
})

const User = mongoose.model<IUser>("User", UserSchema);
export default User;