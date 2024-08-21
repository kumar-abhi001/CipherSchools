import React, {useState, useEffect} from 'react'

export default function TestPage() {
    const apiURL = import.meta.env.VITE_API_URL;
    const [tests, setTests] = useState([]);

    useEffect(() => { 
        fetch(`${apiURL}/api/user/alltest`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
          .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setTests(data.data);
            });
    }, []);
  return (
    <div className="border-2 w-1/2 m-auto mt-10 text-center bg-gray-100">
      <p className="font-bold text-2xl underline">Available Test</p>
      <div>
        {tests.map((test, index) => (
          <div key={index} className="border-b-2 p-2 text-left pl-4 py-4">
            <p className="text-xl font-semibold">{test.title}</p>
            <p>{test.description}</p>
            <p className="mb-4">
              <span className="font-semibold">Total Question: </span>
              {test.questions?.length}
            </p>
            <a
              href={`/user/test/start/${test._id}`}
              className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-lg"
            >
              Start Test
            </a>
          </div>
        ))}
      </div>
      
    </div>
  );
}
