import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Portfolio from './Portfolio';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import "./App.css";
import Blog from './Blog';
import ResumePage from './components/ResumePage';

const App = () => {
  return (
    <Router>
      {/* <div style={{ textAlign: "center", margin: "auto" }}>
        <h1 style={{ color: "#806757", textAlign: "center" }}>
          Chop your own wood and it will warm you twice.
        </h1>
          <div style={{ width: "100px", margin: "auto" }}>
            <Hearts
              height="80"
              width="80"
              color="#FFB889"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </div> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/recent"  element={<Blog />} />
          <Route path="/about"  element={<About />} />
          <Route path="/service"  element={<Services />} />
          <Route path="/resume"  element={<ResumePage />} />
          <Route path="/contact"  element={<Contact />} />
        </Routes>
        </Router>
  );
};

export default App;
