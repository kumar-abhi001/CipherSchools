import React, { useState } from 'react'
import Login from '../components/Login';
import Register from '../components/Register';

export default function LoginPage() {
  const [login, setLogin] = useState(false);
  return (
    <div className="border-2 bg-slate-400 w-1/2 mx-auto">
      <Register />
    </div>
  );
}
