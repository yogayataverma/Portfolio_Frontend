import React, { useState, useEffect } from "react";
import ai_pic from "./ai_pic.png";
import rocks from "./island.webp";
import github from "./github.svg";
import CustomCursor from "./custom_cursor1.svg";
import { PiGithubLogo } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { RiLinkedinLine } from "react-icons/ri";
import { LiaHackerrank } from "react-icons/lia";
import { SiCodechef } from "react-icons/si";
import AnimatedCursor from "react-animated-cursor";
import { IoMdCodeWorking } from "react-icons/io";
import { RiServiceLine } from "react-icons/ri";
import "./App.css";
import { FiPhoneCall } from "react-icons/fi";
import { RiFilePaper2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { RiMessage3Line } from "react-icons/ri";

const Portfolio = () => {
  const phrases = [
    "A Passionate Coder",
    "I Develop Beautiful Websites",
    "Coding Is Love ❤",
    "I Develop Cool Mobile Apps",
  ];
  const [typingIndex, setTypingIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  const navigate = useNavigate();

  const skills = {
    frontend: ["React.js", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
    backend: ["Node.js", "Express.js", "Python", "Java"],
    database: ["MongoDB", "MySQL", "PostgreSQL"],
    tools: ["Git", "Docker", "AWS", "Heroku"]
  };

  const experiences = [
    {
      title: "Software Developer",
      company: "Your Company Name",
      duration: "2022 - Present",
      description: "Working on full-stack web development projects using MERN stack"
    },
    {
      title: "Web Development Intern",
      company: "Internship Company",
      duration: "2021 - 2022",
      description: "Developed and maintained client websites using React.js"
    }
  ];

  useEffect(() => {
    const typingInterval = setInterval(() => {
      const text = phrases[typingIndex];
      setTypingText(text.slice(0, cursorPosition));
      setCursorPosition((prevPosition) => {
        if (prevPosition >= text.length) {
          // If cursor reaches end of text, move to the next phrase
          setTypingIndex((prevIndex) => (prevIndex + 1) % phrases.length);
          return 0;
        } else {
          // Otherwise, move cursor to next position
          return prevPosition + 1;
        }
      });
    }, 150); // Adjust typing speed here

    return () => clearInterval(typingInterval);
  }, [typingIndex, cursorPosition]);

  const ab = () => {
    navigate("/about");
  };

  const ser = () => {
    navigate("/service");
  };

  const project = () => {
    navigate("/project");
  };

  const resume = () => {
    // Navigate to resume page instead of downloading
    navigate('/resume');
  };

  // Add a separate download function if you still want the download option
  const downloadResume = () => {
    try {
      const resumeUrl = `${window.location.origin}/Resume.pdf`;
      
      fetch(resumeUrl)
        .then(response => {
          if (response.ok) {
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.setAttribute('download', 'Yogayata_Verma.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            throw new Error('Resume file not found');
          }
        })
        .catch(error => {
          console.error('Error downloading resume:', error);
          alert('Resume file is not available at the moment. Please try again later.');
        });
    } catch (error) {
      console.error('Error initiating download:', error);
      alert('Unable to download resume. Please try again later.');
    }
  };

  return (
    <div
      className="portfolio-container"
      style={{
        backgroundColor: "#E07E36",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        backgroundImage: `url(${rocks})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <AnimatedCursor
        innerSize={8}
        outerSize={8}
        color="193, 11, 111"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
        clickables={[
          "a",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          "label[for]",
          "select",
          "textarea",
          "button",
          ".link",
          {
            target: ".custom",
            options: {
              innerSize: 12,
              outerSize: 12,
              color: "255, 255, 255",
              outerAlpha: 0.3,
              innerScale: 0.7,
              outerScale: 5,
            },
          },
        ]}
      />

      <div
        className="navbar1"
        style={{
          backgroundColor: "#F3E1CE",
          color: "#FFF",
          padding: 0,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul
          style={{
            listStyleType: "none",
            textAlign: "center",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <li className="navbar-item">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/yverma2000/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                width: "150px",
                padding: "8px 0",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  width: "40px",
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "-5px",
                }}
              >
                <RiServiceLine
                  style={{
                    fontSize: "1.9vw",
                    color: "#FF964F",
                    transform: "scale(1)",
                  }}
                />
              </div>
              <span
                className="navbar-text"
                style={{
                  color: "#8B4513",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                Services
              </span>
            </a>
          </li>

          <li className="navbar-item">
            <a
              target="_blank"
              href="https://www.hackerrank.com/yogayatajugnu/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                width: "150px",
                padding: "8px 0",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  width: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <IoMdCodeWorking
                  style={{ fontSize: "1.9vw", color: "#FF964F" }}
                />
              </div>
              <span
                className="navbar-text"
                style={{
                  color: "#8B4513",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                Projects
              </span>
            </a>
          </li>

          <li className="navbar-item">
            <a
              onClick={resume}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                width: "150px",
                padding: "8px 0",
                justifyContent: "flex-start",
                cursor: "pointer"
              }}
            >
              <div
                style={{
                  width: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RiFilePaper2Line
                  style={{ fontSize: "1.9vw", color: "#FF964F" }}
                />
              </div>
              <span
                className="navbar-text"
                style={{
                  color: "#8B4513",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                Resume
              </span>
            </a>
          </li>

          <li className="navbar-item">
            <a
              target="_blank"
              href="https://www.codechef.com/users/yogayatajugnu"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                width: "150px",
                padding: "8px 0",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  width: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RiMessage3Line
                  style={{ fontSize: "1.9vw", color: "#FF964F" }}
                />
              </div>
              <span
                className="navbar-text"
                style={{
                  color: "#8B4513",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                Contact
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div
        className="portfolio-container"
        style={{
          backgroundColor: "rgba(243, 225, 206, 0.9)",
          borderRadius: "15px",
          padding: "2rem",
          textAlign: "left",
          width: "50%",
          margin: "15% auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ 
          color: "#8B4513", 
          marginBottom: "1.5rem",
          fontSize: "2rem" 
        }}>
          Skills & Expertise
        </h2>

        {/* Skills Section */}
        <div style={{ marginBottom: "2rem" }}>
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ 
                color: "#E07E36", 
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
                textTransform: "capitalize"
              }}>
                {category}
              </h3>
              <div style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                gap: "0.5rem" 
              }}>
                {skillList.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      backgroundColor: "#FFE4C4",
                      color: "#8B4513",
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      fontSize: "0.9rem",
                      border: "1px solid #E07E36"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <h2 style={{ 
          color: "#8B4513", 
          marginBottom: "1.5rem",
          fontSize: "2rem" 
        }}>
          Experience
        </h2>

        <div>
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              style={{ 
                marginBottom: "1.5rem",
                padding: "1rem",
                backgroundColor: "#FFE4C4",
                borderRadius: "10px",
                border: "1px solid #E07E36"
              }}
            >
              <h3 style={{ 
                color: "#8B4513", 
                fontSize: "1.2rem",
                marginBottom: "0.5rem" 
              }}>
                {exp.title}
              </h3>
              <p style={{ 
                color: "#E07E36", 
                fontSize: "1rem",
                marginBottom: "0.5rem" 
              }}>
                {exp.company} | {exp.duration}
              </p>
              <p style={{ 
                color: "#5D4037", 
                fontSize: "0.9rem" 
              }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2rem"
        }}>
          <button
            onClick={project}
            style={{
              backgroundColor: "#E07E36",
              color: "white",
              border: "none",
              padding: "0.8rem 1.5rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold"
            }}
          >
            View Projects
          </button>
          <button
            onClick={downloadResume}
            style={{
              backgroundColor: "#8B4513",
              color: "white",
              border: "none",
              padding: "0.8rem 1.5rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold"
            }}
          >
            Download CV
          </button>
        </div>
      </div>
      <div
        className="portfolio-container fade-in"
        style={{
          backgroundColor: "#CCA8E0",
          borderRadius: "1%",
          border: "5% solid black",
          borderBottomLeftRadius: "50%",
          borderTopLeftRadius: "50%",
          fontFamily: "Comic Sans MS, Comic Sans, cursive",
          padding: "1%",
          textAlign: "center",
          width: "50%",
          backgroundImage: `url(${ai_pic})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};

export default Portfolio;
