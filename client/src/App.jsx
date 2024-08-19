import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage'
import QuizPage from './pages/QuizPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id='main-div'>
      <QuizPage />
    </div>
  )
}

export default App
