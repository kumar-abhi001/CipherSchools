import React, { useState } from "react";
import Status from "../components/Status";

export default function QuizPage() {
  const [quantQuestions, setQuantQuestions] = useState([]);
  const [verbalQuestions, setVerbalQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [statuses, setStatuses] = useState({});
  
  const questionStatus = {
    current: "bg-[#0468bf] text-white",
    notAttempted: "bg-[#ffffff]",
    answered: "bg-[#32eb2c] text-white",
    notAnswered: "bg-[fab12a] text-white",
    review: "bg-[#000423] text-white",
  };
 const q = [
   {
     number: 1,
     title: "What is the capital of France?",
     options: ["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"],
   },
   {
     number: 2,
     title: "Explain the concept of polymorphism in OOP.",
     options: [
       "A) The ability to inherit from multiple classes",
       "B) The ability of an object to take many forms",
       "C) Encapsulation of data",
       "D) The process of defining a method in a subclass",
     ],
   },
   {
     number: 3,
     title: "What is the time complexity of binary search?",
     options: ["A) O(n)", "B) O(log n)", "C) O(n^2)", "D) O(1)"],
   },
   {
     number: 4,
     title: "Describe the lifecycle methods in React.",
     options: [
       "A) Mounting, Updating, Unmounting",
       "B) Rendering, Binding, Execution",
       "C) Initialization, Execution, Destruction",
       "D) Creation, Running, Deletion",
     ],
   },
   {
     number: 5,
     title: "What are closures in JavaScript?",
     options: [
       "A) Functions bundled with their lexical environment",
       "B) Data encapsulation within a function",
       "C) Immediate invocation of a function",
       "D) An object with private methods",
     ],
   },
   {
     number: 6,
     title: "Explain the difference between SQL and NoSQL databases.",
     options: [
       "A) SQL is relational, NoSQL is non-relational",
       "B) SQL supports unstructured data, NoSQL does not",
       "C) SQL uses JSON format, NoSQL uses tables",
       "D) SQL is used for small data, NoSQL is for big data",
     ],
   },
   {
     number: 7,
     title: "What is the Big-O notation for bubble sort?",
     options: ["A) O(n)", "B) O(log n)", "C) O(n^2)", "D) O(n log n)"],
   },
   {
     number: 8,
     title: "How does HTTPS ensure secure communication?",
     options: [
       "A) By using symmetric encryption",
       "B) By encrypting only the data payload",
       "C) By using SSL/TLS for encryption",
       "D) By validating the server only",
     ],
   },
   {
     number: 9,
     title: "What is a RESTful API?",
     options: [
       "A) An API that uses SOAP protocol",
       "B) An API that follows REST principles",
       "C) An API with stateful architecture",
       "D) An API for streaming data",
     ],
   },
   {
     number: 10,
     title:
       "Describe the key differences between GET and POST methods in HTTP.",
     options: [
       "A) GET is idempotent, POST is not",
       "B) GET has a body, POST does not",
       "C) GET is for sending data, POST is for receiving",
       "D) GET is secure, POST is not",
     ],
   },
 ];

  const questionQ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleOptionChange = (option) => {
    const updatedAnswers = {
      ...selectedAnswers,
      [currentQuestion]: option,
    };
    setSelectedAnswers(updatedAnswers);

    const updatedStatuses = {
      ...statuses,
      [currentQuestion]: "answered",
    };
    setStatuses(updatedStatuses);
  };

  const handleQuestionClick = (idx) => {
    setCurrentQuestion(idx);
  };

  return (
    <div className="grid grid-cols-12 h-lvh">
      <div className="col-span-10 grid grid-rows-12">
        {/* Header */}
        <div className="row-span-1 bg-[#e7e7e7] font-bold text-lg text-center pt-2">
          Online Test
        </div>

        <div className="row-span-9">
          <div>Question {currentQuestion + 1}</div>
          <div>{q[currentQuestion].title}</div>
          <div>
            {q[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedAnswers[currentQuestion] === option}
                    onChange={() => handleOptionChange(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </div>
        </div>
        <div className="row-span-2 bg-[#e7e7e7] flex flex-col justify-evenly">
          <div className="flex flex-row justify-between px-20">
            <div className="flex flex-row">
              <button className="mr-3  rounded-3xl p-2 px-3 bg-[#a40503] text-white"
              onClick={() => {setStatuses({...statuses, [currentQuestion]: "review"})}}
              >
                Mark for Review
              </button>
              <button className="mr-2  rounded-l-3xl p-2 px-3 w-20 bg-blue-600 text-white hover:bg-blue-400"
                onClick={() => {currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}}
              >
                Previous
              </button>
              <button className="mr-3  rounded-r-3xl p-2 px-3 w-20 bg-blue-600 text-white hover:bg-blue-400"
                onClick={() => {currentQuestion < q.length - 1 && setCurrentQuestion(currentQuestion + 1)}}
              >
                Next
              </button>
            </div>
            <div>
              <button onClick={() => console.log("submit")}>Submit</button>
            </div>
          </div>
          <div className="border-t-black border-2 flex flex-row justify-evenly pt-4">
            <Status text="Current" color="#0468bf" />
            <Status text="Not Attempted" color="#ffffff" />
            <Status text="Answered" color="#32eb2c" />
            <Status text="Not Answered" color="#fab12a" />
            <Status text="Review" color="#000423" />
          </div>
        </div>
      </div>

      <div className="col-span-2 z-10 bg-white grid grid-rows-12 fixed justify-self-end">
        <div className="row-span-2 justify-center">
          <div className="bg-[#929294] text-center h-[3.8rem] font-bold pt-4">
            Time Left
          </div>
          <div className=" text-center py-2">timer</div>
        </div>
        <div className="row-span-3">
          <div className="bg-[#e7e7e7] text-center">Quant</div>
          <div className="text-center py-2 grid grid-cols-6">
            {q.map((question, idx) => (
              <div
                onClick={() => handleQuestionClick(idx)}
                key={idx + 1}
                className={`bg-[#e9e9e9] m-1 rounded-tl-xl h-10 w-10 text-center pt-2 cursor-pointer hover:bg-gray-300 hover:text-black
                    ${statuses[idx] && questionStatus[statuses[idx]]}  ${
                  currentQuestion === idx ? "bg-[#0468bf] text-white border-2 border-black" : ""
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="row-span-7">
          <div className="bg-[#e7e7e7] text-center">Verbal</div>
          <div className="text-center py-2 grid grid-cols-6">
            {questionQ.map((question) => (
              <div
                key={question}
                className="bg-[#e9e9e9] m-1 rounded-tl-xl h-10 w-10 text-center pt-2 cursor-pointer hover:bg-gray-300"
              >
                {question}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
