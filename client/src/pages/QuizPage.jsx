import React, { useEffect, useState } from "react";
import Status from "../components/Status";
import CameraAndMic from "../components/CameraAndMic";

const apiURL = import.meta.env.VITE_API_URL;

export default function QuizPage() {
  const [streamStarted, setStreamStarted] = useState(true);
  const [quantQuestion, setQuantQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [statuses, setStatuses] = useState({});
  const [startTest, setStartTest] = useState(true);
  const questionStatus = {
    current: "bg-[#0468bf] text-white",
    notAttempted: "bg-[#ffffff]",
    answered: "bg-[#32eb2c] text-white",
    notAnswered: "bg-[fab12a] text-white",
    review: "bg-[#000423] text-white",
  };
  // Get all questions from backend
  useEffect(() => {
    fetch(`${apiURL}/api/user/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuantQuestions(data.data.quantQuestions);
        console.log("quantQuestion", data.data.quantQuestions[0].options);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Timer logic
  useEffect(() => {
    const storedEndTime = localStorage.getItem("quizEndTime");
    if (storedEndTime) {
      // Calculate time left
      const endTime = new Date(storedEndTime).getTime();
      const currentTime = new Date().getTime();
      setTimeLeft(Math.max(0, endTime - currentTime));
    } else {
      // Set new end time (15 minutes from now)
      const newEndTime = new Date(Date.now() + 30 * 60 * 1000);
      localStorage.setItem("quizEndTime", newEndTime);
      setTimeLeft(30 * 60 * 1000); // 30 minutes in milliseconds
    }
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(timerInterval);
          return 0; // Timer finished
        }
        return prev - 1000; // Decrease by 1 second
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Function to format time in HH:MM:SS
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {hours, minutes, seconds}
  };

  const handleOptionChange = (option, id) => {
    const updatedAnswers = {
      ...selectedAnswers,
      [id]: option,
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

  // Handle test submit
  const handlerTestSubmit = () => {
    setTimeLeft(0);
    localStorage.removeItem("quizEndTime");
    console.log(selectedAnswers);
    fetch(`${apiURL}/api/user/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedOptions: selectedAnswers,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {streamStarted && startTest ? (
        <div className="grid grid-cols-12 h-lvh">
          <div className="col-span-10 grid grid-rows-12">
            {/* Header */}
            <div className="row-span-1 bg-[#e7e7e7] font-bold text-lg text-center pt-2">
              Online Test
            </div>

            <div className="row-span-9 p-10">
              <div className="text-xl font-bold">
                Question {currentQuestion + 1}
              </div>
              <div className="border-t-2 w-3/4 my-4"></div>
              <div className="text-3xl">
                {quantQuestion[currentQuestion]?.title}
              </div>
              <div>
                {quantQuestion[currentQuestion]?.options.map(
                  (option, index) => (
                    <li key={index} className="color-white list-none">
                      <label className="text-xl">
                        <input
                          type="radio"
                          value={option}
                          checked={
                            selectedAnswers[
                              quantQuestion[currentQuestion]?._id
                            ] === option
                          }
                          onChange={() =>
                            handleOptionChange(
                              option,
                              quantQuestion[currentQuestion]?._id
                            )
                          }
                          className="mr-2 cursor-pointer"
                        />
                        {option}
                      </label>
                    </li>
                  )
                )}
              </div>
            </div>
            <div className="row-span-2 bg-[#e7e7e7] flex flex-col justify-evenly">
              <div className="flex flex-row justify-between px-20">
                <div className="flex flex-row">
                  <button
                    className="mr-3 rounded-3xl p-2 px-3 bg-[#a40503] text-white"
                    onClick={() => {
                      setStatuses({ ...statuses, [currentQuestion]: "review" });
                    }}
                  >
                    Mark for Review
                  </button>
                  <button
                    className="mr-2 rounded-l-3xl p-2 px-3 w-20 bg-blue-600 text-white hover:bg-blue-400"
                    onClick={() => {
                      currentQuestion > 0 &&
                        setCurrentQuestion(currentQuestion - 1);
                    }}
                  >
                    Previous
                  </button>
                  <button
                    className="mr-3 rounded-r-3xl p-2 px-3 w-20 bg-blue-600 text-white hover:bg-blue-400"
                    onClick={() => {
                      currentQuestion < quantQuestion.length - 1 &&
                        setCurrentQuestion(currentQuestion + 1);
                    }}
                  >
                    Next
                  </button>
                </div>
                <div>
                  <button
                    className="mr-3 rounded-3xl p-2 px-3 w-20 bg-[#398b39] text-white hover:bg-[#82cc82]"
                    onClick={handlerTestSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="border-t-black border-2 flex flex-row justify-evenly pt-4">
                <Status text="Current" color="#4793d5" />
                <Status text="Not Attempted" color="#ffffff" />
                <Status text="Answered" color="#398b39" />
                <Status text="Not Answered" color="#ed8c30" />
                <Status text="Review" color="#a40503" />
              </div>
            </div>
          </div>

          <div className="col-span-2 z-10 bg-white grid grid-rows-12 fixed justify-self-end h-full">
            <div className="row-span-2 justify-center">
              <div className="bg-[#929294] text-center h-[3.8rem] font-bold pt-4">
                Time Left
              </div>
              <div className="text-center py-2 flex flex-row p-2 justify-evenly">
                <div className="flex flex-col">
                  <div className="text-xl">{formatTime(timeLeft).hours}</div>
                  <div className="text-sm">hours</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-xl">{formatTime(timeLeft).minutes}</div>
                  <div className="text-sm">minutes</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-xl">{formatTime(timeLeft).seconds}</div>
                  <div className="text-sm">second</div>
                </div>
              </div>
            </div>

            <div className="row-span-3">
              <div className="bg-[#e7e7e7] text-center">Quant</div>
              <div className="text-center py-2 grid grid-cols-6">
                {quantQuestion.map((question, idx) => (
                  <div
                    onClick={() => handleQuestionClick(idx)}
                    key={question._id}
                    className={`m-1 rounded-tl-xl h-10 w-10 text-center pt-2 cursor-pointer
                   hover:bg-gray-300 ${
                     statuses[idx] && questionStatus[statuses[idx]]
                   }  
                    ${
                      currentQuestion === idx
                        ? "bg-[#4793d5] text-white border-2 border-black"
                        : ""
                    }`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold">Welcome to Online Test</h1>
          <p className="text-lg mt-4 text-red-500">
            **Give permission for Camera and Microphone to Start the Test**
          </p>
          {streamStarted && (
            <button
              onClick={() => setStartTest(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Test{" "}
            </button>
          )}
        </div>
      )}
      <CameraAndMic
        setStreamStarted={setStreamStarted}
        streamStarted={streamStarted}
      />
    </div>
  );
}
