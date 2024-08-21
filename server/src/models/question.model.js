    import mongoose, { Schema } from "mongoose";

    const questionSchema = new Schema({
        title: {
            type: String,
        },
        options: [{
            type: String,
            min: 0,
            max: 3,
            required: true,
        }],
        testId: {
            type: Schema.Types.ObjectId,
            ref: "Test",
            required: true,
        },
        correctAnswer: {
            type: Number,
            required: true,
        },
    }, { timestamps: true });

    export const Question = mongoose.model("Question", questionSchema);