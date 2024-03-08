import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./pages/Home/Home";
import { DataProvider } from "./contexts/DataContexts";

const App = () => {
  return (
    <DataProvider>
      <Router>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </DataProvider>
  );
};

export default App;
