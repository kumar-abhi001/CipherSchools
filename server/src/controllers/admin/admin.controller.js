import { asyncHandler } from "../../utils/AsyncHandler.js";
import { Question } from "../../models/question.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Test } from "../../models/test.model.js";
import mongoose from "mongoose";


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

const createTest = asyncHandler(async (req, res) => {
    const data = req.body;
    const {title, description, questions} = data;
    if(!title || !description || !questions) {
        throw new ApiError(400, "All fields are required");
    }

    //create session and transaction show that if any error occurs, the data is not saved
    const session = await mongoose.startSession();
    session.startTransaction();

    //create test document
    const test = await Test.create({
        title,
        description,
    });

    if (!test) {
        throw new ApiError(500, "Something went wrong while creating test");
    }

    //add questions to test
    const questionIds = await questions.map(async (questionData) => {
        const question = await Question.create({
            title: questionData.question,
            options: questionData.options,
            correctAnswer: questionData.correctOptionIndex,
            testId: test._id,
        });

        return question._id;
    });

    //update test document with question ids
    test.questions = questionIds;
    await test.save();

    //commit transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json(
        new ApiResponse(200, test, "Test created successfully")
    );
 });
export { addQuestion, createTest };