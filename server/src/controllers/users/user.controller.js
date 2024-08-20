import {asyncHandler} from "./../../utils/AsyncHandler.js"
import {ApiError} from "./../../utils/ApiError.js"
import {ApiResponse} from "./../../utils/ApiResponse.js"
import { User } from "../../models/user.model.js"
import { Question } from "../../models/question.model.js"
import { Test } from "../../models/test.model.js"
import { Submission } from "../../models/submission.model.js"
import { sendEmail } from "../../utils/SendEmail.js"

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    // req.body -> data
    const {name, email, password } = req.body
    //console.log("email: ", email);

    if (
        [name, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({email})

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
   
    const user = await User.create({
        name,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

const loginUser = asyncHandler(async (req, res) =>{
    
    const {email, password} = req.body

    if (!password || !email) {
        throw new ApiError(400, "email or password is required")
    }

    const user = await User.findOne({email})

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const allQuestions = asyncHandler(async (req, res) => { 
    const quantQuestions = await Question.find({ type: "Quant" });
    const verbalQuestions = await Question.find({ type: "verbal" });

    return res.status(200).json(
        new ApiResponse(200, { quantQuestions, verbalQuestions }, "Questions fetched successfully")
    )
});

const submitTest = asyncHandler(async (req, res) => {


    const { selectedOptions } = req.body;

    if(!selectedOptions) {
        throw new ApiError(400, "selectedOptions is required");
    }

    //coverting selectedOptions to array of questionId
    const selection = Object.entries(selectedOptions).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption: selectedOption,
    }));
    const usedId = req._id || "66c491d81e533a3706e666b9";

    const submission = await Submission.create({
        testId: "66c491d81e533a3706e666b9",
        userId: usedId,
        selection: selection,
    });
    const selectected = await Submission.findById(submission._id).populate("selection.questionId");

    //evaluate the test
    if (!selectected) {
            return res.status(404).json({ message: "Submission not found" });
        }

        // Calculate marks obtained
        let marksObtained = 0;

        for (const select of selectected.selection) {
            const question = select.questionId; // This is the populated question document
            if (question && select.selectedOption === question.correctAnswer) {
                marksObtained += 1; // Increment marks for correct answer
            }
        }
    console.log(JSON.stringify(selectected, null, 2)); 
    console.log("Marks obtained: ", marksObtained);


    // Send email to user
    const emailTemplatePath = path.join(__dirname, 'EmailTemplate.html');
    let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');

        emailTemplate = emailTemplate
            .replace('{{userName}}', 'Abhishek')
        .replace('{{score}}', marksObtained.toString());
    
    const sendMarks = await sendEmail("kumar.abhi.ok@gmail.com", "Test Results", emailTemplate);
    return res.status(200).json(new ApiResponse(200, {}, "Test submitted successfully"));
    
});
export {
    registerUser,
    loginUser,
    logoutUser,
    allQuestions,
    submitTest
}