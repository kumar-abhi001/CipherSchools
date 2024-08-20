import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
    title: {
        type: String,
    },
    options: [{
        type: String,
    }],
    testId: {
        type: Schema.Types.ObjectId,
        ref: "Test",
        required: true,
    },
    makrs: {
        type: Number,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Question = mongoose.model("Question", questionSchema);