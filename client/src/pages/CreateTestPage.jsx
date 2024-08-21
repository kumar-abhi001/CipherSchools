import React, { useState } from 'react'

const apiURL = import.meta.env.VITE_API_URL;
export default function CreateTestPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: ['', ''], correctOptionIndex: 0 }]);
    const [tests, setTests] = useState([]);

      const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].question = event.target.value;
        setQuestions(newQuestions);
      };

      const handleOptionChange = (qIndex, oIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = event.target.value;
        setQuestions(newQuestions);
      };

      const handleCorrectOptionChange = (qIndex, oIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].correctOptionIndex = oIndex;
        setQuestions(newQuestions);
    };

     const addQuestion = () => {
       setQuestions([
         ...questions,
         { question: "", options: [""], correctOptionIndex: null },
       ]);
     };

     const removeQuestion = (index) => {
       setQuestions(questions.filter((_, i) => i !== index));
     };

     const addOption = (qIndex) => {
       const newQuestions = [...questions];
       newQuestions[qIndex].options.push("");
       setQuestions(newQuestions);
     };

     const removeOption = (qIndex, oIndex) => {
       const newQuestions = [...questions];
       newQuestions[qIndex].options = newQuestions[qIndex].options.filter(
         (_, i) => i !== oIndex
       );
       if (newQuestions[qIndex].correctOptionIndex === oIndex) {
         newQuestions[qIndex].correctOptionIndex = null;
       } else if (newQuestions[qIndex].correctOptionIndex > oIndex) {
         newQuestions[qIndex].correctOptionIndex -= 1;
       }
       setQuestions(newQuestions);
     };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { title, description, questions };
        //fetch API to send data to the server
        fetch(`${apiURL}/api/admin/createtest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                window.alert(data.message);
            })
            .catch((err) => {
                console.log(err);
                window.alert('An error occurred. Please try again later.');
            });   
    }
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Create New Test
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Test Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <textarea
              placeholder="Test Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              rows="4"
              required
            />
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="border-t border-gray-300 pt-4">
                <input
                  type="text"
                  placeholder={`Question ${qIndex + 1}`}
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  className="w-full p-3 border border-gray-300 rounded mb-2"
                  required
                />
                <div>**Select the correct option**</div>
                {q.options.map((option, oIndex) => (
                  <div
                    key={oIndex}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <input
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                    <input
                      type="radio"
                      name={`correctOption-${qIndex}`}
                      checked={q.correctOptionIndex === oIndex}
                      onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                      className="ml-2 "
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(qIndex, oIndex)}
                      className="bg-red-500 hover:bg-red-400 text-white p-1 h-8 px-2 rounded ml-2"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(qIndex)}
                  className="bg-blue-600 hover:bg-blue-400 text-white p-2 rounded mt-2"
                >
                  <span>option</span>+
                </button>
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="bg-red-500 text-white p-2 rounded mt-2 ml-2"
                >
                  Remove Question
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="bg-blue-500 text-white p-3 rounded mt-4"
            >
              Add Question
            </button>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 mt-4"
            >
              Create Test
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
