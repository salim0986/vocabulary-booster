import "./styles/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Selection from "./components/Selection";
import Learning from "./components/Learning";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Selection />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/test" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
