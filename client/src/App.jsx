import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import Result from "./pages/ResultPage";
import CreateTestPage from "./pages/CreateTestPage";
import TestPage from "./pages/TestPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user" element={<Navbar />}>
            <Route path="test" element={<TestPage />} />
            <Route path="test/start/:id" element={<QuizPage />} />
            <Route path="result" element={<Result />} />
            <Route path="admin/createtest" element={<CreateTestPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
