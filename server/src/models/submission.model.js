import mongoose, { Schema } from "mongoose";

const submissionSchema = new Schema({
    testId: {
        type: Schema.Types.ObjectId,
        ref: "Test",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    selection: [{
        questionId: {
            type: Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },
        selectedOption: {
            type: String,
            required: true,
        },
    }],
    endedAt: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const Submission = mongoose.model("Submission", submissionSchema);