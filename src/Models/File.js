import mongoose from "mongoose";

const fileschema = new mongoose.Schema({
    fileName: String,
    filePath: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("File",fileschema);