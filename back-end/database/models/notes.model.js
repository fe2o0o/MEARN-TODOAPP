import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    content: {
        type: String,
        required:true
    },
    isDone: {
        type: Boolean,
        default:false
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref:'user'
    }
}, {
    timestamps:true
})


export const notesModel = mongoose.model('note' , noteSchema)