import React from 'react'
import { Outlet } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <div className="flex border-2 h-16 justify-between px-4 align-middle pt-4">
        <div className="text-2xl font-bold text-cyan-800 font-mono">
          TestIsBest
        </div>
        <div className="flex w-36 justify-between mr-10">
          <div className="border-2 h-10 text-center p-1 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-300 cursor-pointer">
            Tests
          </div>
          <div className="border-2 h-10 text-center p-1 px-4 rounded-md bg-red-500 text-white hover:bg-red-300 cursor-pointer">
            Logout
          </div>
        </div>
          </div>
          <Outlet />
    </div>
  );
}
