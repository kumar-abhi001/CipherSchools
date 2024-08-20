import mongoose, { Schema } from "mongoose";

const testSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: "Question",
        },
    }],
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

export const Test = mongoose.model("Test", testSchema);