import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Result() {
  const navigate = useNavigate();
  return (
    <div className="border-2  w-1/4 m-auto mt-64 p-4 ">
      <h1 className="font-bold text-2xl">Thank for give the test</h1>
      <p>Your score will be send on your register email</p>
      <button
        className="border-2 p-2 ml-36 mt-10 rounded-2xl bg-blue-500 text-white hover:bg-blue-400"
        onClick={() => navigate("/user/test")}
      >
        Home
      </button>
    </div>
  );
}
