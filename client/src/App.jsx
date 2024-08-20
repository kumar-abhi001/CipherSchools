import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/test" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
