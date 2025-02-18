import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Portfolio from './Portfolio';
import Recent from './Recent';
import ai_pic from './ai_pic.png';
import rocks from './island.webp';
import github from './github.svg';
import CustomCursor from "./custom_cursor1.svg";
import { PiGithubLogo } from "react-icons/pi";
import { RiLinkedinLine } from "react-icons/ri";
import { LiaHackerrank } from "react-icons/lia";
import { SiCodechef } from "react-icons/si";
import AnimatedCursor from "react-animated-cursor"; 
import About from './About';
import Services from './Services';
import Project from './Project';
import Resume from './Resume';
import Contact from './Contact';
import { useState } from "react";
import { Hearts, TailSpin } from "react-loader-spinner";
import "./App.css";
import Blog from './Blog';
import AIChat from './components/AIChat';
import ResumePage from './components/ResumePage';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
 
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
          <Route path="/project"  element={<Project />} />
          <Route path="/resume"  element={<ResumePage />} />
          <Route path="/contact"  element={<Contact />} />
        </Routes>
        </Router>
  );
};

export default App;
