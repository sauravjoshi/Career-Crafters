import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ResumeParser from "./pages/ResumeParser";
import Visualizations from "./pages/Visualizations";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <Link to="/" className="text-lg font-bold hover:underline">
                Career Crafters
              </Link>
            </div>
            <ul className="flex space-x-60">
              <li>
                <Link to="/" className="hover:underline">
                  Resume Parser
                </Link>
              </li>
              <li>
                <Link to="/visualizations" className="hover:underline">
                  Visualizations
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<ResumeParser />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
