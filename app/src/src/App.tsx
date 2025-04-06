import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GUI from "./views/GUI";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<GUI />} />
      </Routes>
    </Router>
  );
}

export default App;
