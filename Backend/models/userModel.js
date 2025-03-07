import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    role: {type: String, default: "user", required:true},
    email:   {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, default: ""},
    image: {type: String, default: "https://res.cloudinary.com/djxinb7ul/image/upload/v1740038548/yl7xkpvqcrcxzvkeh44l.png"},
    date: {type: Number, required: true},
    phone: {type: Number, default: "0000000000"},
    gender: {type: String, default: "Not Selected"},
    dob: {type: String, default: "not selected"}
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;