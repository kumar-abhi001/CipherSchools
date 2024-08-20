import React, { useState } from 'react'
import Login from '../components/Login';
import Register from '../components/Register';

export default function LoginPage() {
  const [login, setLogin] = useState(false);
  return (
    <div className="border-2 bg-slate-100 mx-auto mt-10 w-1/3 rounded-2xl p-6">
      {login ? <Login setLogin={ setLogin } /> : <Register login={setLogin} />}
    </div>
  );
}
