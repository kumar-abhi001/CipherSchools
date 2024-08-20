import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
});
    
const sendEmail = async (email, subject, emailTemplate) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject,
            html: emailTemplate
        });
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while sending email")
    }
}

export { sendEmail };