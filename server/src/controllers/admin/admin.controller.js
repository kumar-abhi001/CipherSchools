import { asyncHandler } from "../../utils/AsyncHandler.js";
import { Question } from "../../models/question.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const addQuestion = asyncHandler(async (req, res) => { 
    const { title, options, correctAnswer, type } = req.body;

    if (
        !title || !options || !correctAnswer || !type
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const question = await Question.create({
        title,
        options,
        correctAnswer,
        type,
    });

    if (!question) {
        throw new ApiError(500, "Something went wrong while adding question");
    }

    return res.status(201).json(
        new ApiResponse(200, question, "Question added successfully")
    );
});

export { addQuestion };