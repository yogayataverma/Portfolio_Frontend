import React, { useState, useEffect, useRef } from "react";
import ai_pic from "./ai_pic.png";
import rocks from "./island_enhanced.webp";
import { PiGithubLogo } from "react-icons/pi";
import { RiLinkedinLine } from "react-icons/ri";
import { SiCodechef } from "react-icons/si";
import { TbBrandLeetcode } from "react-icons/tb";
import AnimatedCursor from "react-animated-cursor";
import "./App.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/Loader";
import AIChat from "./components/AIChat";
import { LiaHackerrank } from "react-icons/lia";

const Portfolio = () => {
  const [showModal, setShowModal] = useState(false);

  const [animateModal, setAnimateModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    setAnimateModal(true);
  };

  useEffect(() => {
    if (animateModal) {
      const timer = setTimeout(() => {
        setAnimateModal(false);
      }, 1000); // Assuming your animation lasts 1s

      return () => clearTimeout(timer);
    }
  }, [animateModal]);

  const closeModal = () => setShowModal(false);

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  console.log(text);
  console.log(index);
  console.log(setIndex);

  const navigate = useNavigate();

  useEffect(() => {
    const phrases = [
      "A Passionate Coder",
      "I Develop Beautiful Websites",
      "Coding Is Love ❤",
      "I Develop Cool Mobile Apps",
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (isDeleting) {
        setText(currentPhrase.substring(0, currentCharIndex - 1));
        currentCharIndex--;
      } else {
        setText(currentPhrase.substring(0, currentCharIndex + 1));
        currentCharIndex++;
      }

      let typingSpeed = 150; // Increased from a lower value (like 50) to 150ms

      if (isDeleting) {
        typingSpeed /= 2; // Make deletion faster than typing
      }

      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at the end of phrase
        isDeleting = true;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before starting new phrase
      }

      setTimeout(type, typingSpeed);
    };

    type();

    return () => {
      // Cleanup if needed
    };
  }, []);

  const pnavigate = () => {
    navigate("/resume");
  };

  const rnavigate = () => {
    navigate("/recent");
  };

  const [visitorCount, setVisitorCount] = useState(0);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // Prevent double execution
    effectRan.current = true;

    // Get the stored count from localStorage, default to 0 if not exists
    const storedCount = Number(localStorage.getItem("visitorCount")) || 0;
    const newCount = storedCount + 1;

    setVisitorCount(newCount);
    localStorage.setItem("visitorCount", newCount.toString());
  }, []);

  const useIntersectionObserver = (elementRef, threshold = 0.1) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
            }
          });
        },
        { threshold }
      );

      const element = elementRef.current;
      if (element) {
        observer.observe(element);
      }

      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }, [elementRef, threshold]);
  };

  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  useIntersectionObserver(servicesRef);
  useIntersectionObserver(contactRef);

  // Add new state for form fields
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  // Add handler for input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id === "exampleInputEmail1" ? "email" : "message"]: value,
    }));
  };

  // Add handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.message) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: "Please fill in all fields",
      });
      return;
    }

    setSubmitStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch("https://portfolio-backend-hdxw.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus({ loading: false, success: true, error: null });
      setFormData({ email: "", message: "" }); // Clear form

      // Show success for 3 seconds
      setTimeout(() => {
        setSubmitStatus((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: error.message,
      });
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or actual data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // console.log("Services Section Ref:", servicesRef.current);
  // console.log("Contact Section Ref:", contactRef.current);

  // Add new state for contact modal
  const [showContactModal, setShowContactModal] = useState(false);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="portfolio-container"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        backgroundImage: `url(${rocks})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "sticky",
        overflowX: "hidden",
        overflowY: showModal ? "hidden" : "scroll",
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
          "body",
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

      {showModal && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
            animation: animateModal ? "fadeIn 1s ease" : "none",
            cursor: "pointer",
          }}
        >
          <div
            className="beautiful-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(135deg, #F3E1CE 0%, #FFE4C4 100%)",
              borderRadius: "20px",
              padding: "2.5rem",
              width: "85%",
              maxWidth: "650px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              position: "relative",
              cursor: "default",
              border: "2px solid #E07E36",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                cursor: "pointer",
                fontSize: "24px",
                color: "#008080",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "all 0.3s ease",
              }}
              onClick={closeModal}
            >
              ✕
            </div>

            <h2
              style={{
                marginBottom: "1.5rem",
                color: "#008080",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "2.2em",
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Welcome to My Digital Journey! 🚀
            </h2>

            <div
              style={{
                width: "80px",
                height: "4px",
                background: "#E07E36",
                margin: "0 auto 2rem",
                borderRadius: "2px",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                marginBottom: "1.8rem",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "1.2rem",
                  background: "rgba(255,255,255,0.4)",
                  borderRadius: "12px",
                  flex: "1",
                  maxWidth: "180px",
                }}
              >
                <h3
                  style={{
                    color: "#008080",
                    marginBottom: "0.5rem",
                    fontSize: "1.1em",
                  }}
                >
                  ✨ Vision
                </h3>
                <p
                  style={{
                    color: "#556B2F",
                    fontSize: "0.9em",
                    lineHeight: "1.6",
                  }}
                >
                  Creating technology that empowers and inspires positive change
                </p>
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "1.2rem",
                  background: "rgba(255,255,255,0.4)",
                  borderRadius: "12px",
                  flex: "1",
                  maxWidth: "180px",
                }}
              >
                <h3
                  style={{
                    color: "#008080",
                    marginBottom: "0.5rem",
                    fontSize: "1.1em",
                  }}
                >
                  💫 Values
                </h3>
                <p
                  style={{
                    color: "#556B2F",
                    fontSize: "0.9em",
                    lineHeight: "1.6",
                  }}
                >
                  Innovation, Creativity, and User-Centric Design
                </p>
              </div>
            </div>

            <p
              style={{
                color: "#556B2F",
                textAlign: "center",
                lineHeight: "1.8",
                fontSize: "1.15em",
                fontStyle: "italic",
                background: "rgba(255,255,255,0.4)",
                padding: "1.2rem",
                borderRadius: "12px",
                marginBottom: "1rem",
              }}
            >
              "Every line of code I write is an opportunity to create something
              meaningful that enhances people's lives. I believe in the power of
              technology to transform ideas into impactful solutions."
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            ></div>
          </div>
        </div>
      )}

      {showContactModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowContactModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
            cursor: "pointer",
          }}
        >
          <div
            className="contact-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(135deg, #F3E1CE 0%, #FFE4C4 100%)",
              borderRadius: "20px",
              padding: "2.5rem",
              width: "85%",
              maxWidth: "500px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              position: "relative",
              cursor: "default",
              border: "2px solid #E07E36",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                cursor: "pointer",
                fontSize: "24px",
                color: "#008080",
              }}
              onClick={() => setShowContactModal(false)}
            >
              ✕
            </div>

            <h2
              style={{
                marginBottom: "1.5rem",
                color: "#008080",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "2em",
              }}
            >
              Contact Details
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.4)",
                  padding: "1rem",
                  borderRadius: "10px",
                }}
              >
                <h3 style={{ color: "#008080", marginBottom: "0.5rem" }}>
                  📧 Email
                </h3>
                <p style={{ color: "#556B2F" }}>yogayatajugnu@gmail.com</p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.4)",
                  padding: "1rem",
                  borderRadius: "10px",
                }}
              >
                <h3 style={{ color: "#008080", marginBottom: "0.5rem" }}>
                  📱 Phone
                </h3>
                <p style={{ color: "#556B2F" }}>+91 9876543210</p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.4)",
                  padding: "1rem",
                  borderRadius: "10px",
                }}
              >
                <h3 style={{ color: "#008080", marginBottom: "0.5rem" }}>
                  📍 Location
                </h3>
                <p style={{ color: "#556B2F" }}>Patiala, Punjab, India</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
              rel="noopener noreferrer"
              href="https://github.com/yogayataverma/"
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
                  marginLeft: "-2px",
                }}
              >
                <PiGithubLogo
                  style={{
                    fontSize: "2.3vw",
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
                Github
              </span>
            </a>
          </li>

          <li className="navbar-item">
            <a
              target="_blank"
              rel="noopener noreferrer"
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
                  width: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RiLinkedinLine
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
                LinkedIn
              </span>
            </a>
          </li>

          <li className="navbar-item">
            <a
              target="_blank"
              rel="noopener noreferrer"
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
                <LiaHackerrank
                  style={{ fontSize: "1.9vw", color: "#FF964F" }}
                />
              </div>
              <span
                className="navbar-text"
                style={{
                  color: "#8B4513",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  marginTop: "-1px",
                }}
              >
                Hackerrank
              </span>
            </a>
          </li>

          <li className="navbar-item">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://leetcode.com/u/yogayataverma/"
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
                <TbBrandLeetcode  style={{ fontSize: "1.9vw", color: "#FF964F" }} />
              </div>
              <span
                className="navbar-text"
                style={{
                  color: "#8B4513",
                  fontWeight: "bold",
                  marginTop: "-1px",
                  marginLeft: "10px",
                }}
              >
                LeetCode
              </span>
            </a>
          </li>

          <li className="navbar-item">
            <a
              target="_blank"
              rel="noopener noreferrer"
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
                <SiCodechef style={{ fontSize: "1.9vw", color: "#FF964F" }} />
              </div>
              <span
                className="navbar-text"
                style={{
                  color: "#8B4513",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                Codechef
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div style={{ display: "block" }}>
        <div
          className="portfolio-container"
          style={{
            backgroundColor: "transparent",
            border: "5% solid #BFA1E8",
            padding: "1%",
            textAlign: "center",
            width: "50%",
            marginTop: "10%",
            marginLeft: "10%",
            marginRight: "15%",
            marginBottom: "0%",
          }}
        >
          <h1
            className="fade-in"
            style={{
              marginTop: "0%",
              marginLeft: "20%",
              marginRight: "20%",
              marginBottom: "0%",
              textAlign: "center",
              fontSize: "2vw",
              color: "#008080",
            }}
          >
            Hi, I'm Yogayata Verma
          </h1>
          <br />
          <h2
            className="fade-in"
            style={{
              marginTop: "0%",
              marginLeft: "20%",
              marginRight: "20%",
              marginBottom: "0%",
              textAlign: "center",
              fontSize: "1.5vw",
              color: "#556B2F",
            }}
          >
            {text}
            <span
              style={{
                marginLeft: "0.01em",
                animation: "1s blink infinite",
                borderRight: "2px solid black",
              }}
            >
              &nbsp;
            </span>
          </h2>
          <br />
          <p
            className="fade-in"
            style={{
              textAlign: "justify",
              fontSize: "0.9em",
              color: "#556B2F",
              width: "70%",
              marginLeft: "12%",
              marginBottom: "5%",
            }}
          >
            Experienced Software Developer with extensive full-time experience
            in full-stack development, specializing in React.js, Node.js,
            Typescript, Django and Angular. Strong project management skills
            with a Master's in Computer Applications from Thapar University.
          </p>
          <div className="button-container" style={{ marginLeft: "-9%" }}>
            <button className="portfolio-button" onClick={pnavigate}>
              Portfolio
            </button>
            <button className="recent-updates-button" onClick={rnavigate}>
              Recent Updates
            </button>
          </div>
        </div>

        <div
          ref={servicesRef}
          className="portfolio-container scroll-animation"
          style={{
            backgroundColor: "transparent",
            border: "5% solid #BFA1E8",
            padding: "1%",
            textAlign: "center",
            width: "50%",
            marginTop: "15%",
            marginLeft: "9%",
            marginRight: "15%",
            marginBottom: "0%",
            borderRadius: "10px",
            boxShadow: "0 8px 16px #F8C794",
          }}
        >
          <h1
            className="fade-in"
            style={{
              marginTop: "0%",
              marginLeft: "17%",
              marginRight: "20%",
              marginBottom: "0%",
              textAlign: "center",
              fontSize: "2vw",
              color: "#008080",
            }}
          >
            SERVICES
          </h1>

          <div
            class="card-container"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <div
              class="flip-card service-card"
              style={{ marginTop: "20px", marginRight: "5px" }}
            >
              <div class="flip-card-inner rounded">
                <div
                  class="flip-card-front rounded"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div class="card-body" style={{ textAlign: "center" }}>
                    <h5 class="card-title">Software Development</h5>
                    <p class="card-text"></p>
                  </div>
                </div>
                <div
                  class="flip-card-back rounded"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    class="card-body"
                    style={{ textAlign: "center", padding: "1%" }}
                  >
                    <p class="card-text">
                      Elevate your enterprise with scalable, industry-tailored
                      solutions that boost efficiency, increase productivity,
                      and give you a competitive edge. These strategies ensure
                      you meet current needs and are prepared for future growth,
                      driving sustained success.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flip-card1 service-card" style={{ marginTop: "20px" }}>
              <div class="flip-card-inner1">
                <div
                  class="flip-card-front1 rounded"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div class="card-body" style={{ textAlign: "center" }}>
                    <h5 class="card-title">Data Analysis</h5>
                    <p class="card-text"></p>
                  </div>
                </div>
                <div
                  class="flip-card-back1 rounded"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2%",
                  }}
                >
                  <div class="card-body" style={{ textAlign: "center" }}>
                    <p class="card-text">
                      Unlock your data's full potential with our in-depth
                      analysis services. We provide comprehensive, actionable
                      insights that enable informed decisions, optimize
                      processes, and boost efficiency. Let us transform your
                      data into a key asset for growth and competitive
                      advantage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              class="flip-card2 service-card"
              style={{ marginTop: "-195px" }}
            >
              <div class="flip-card-inner2">
                <div
                  class="flip-card-front2 rounded"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div class="card-body" style={{ textAlign: "center" }}>
                    <h5 class="card-title">Android Apps</h5>
                    <p class="card-text"></p>
                  </div>
                </div>
                <div
                  class="flip-card-back2 rounded"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div class="card-body" style={{ textAlign: "center" }}>
                    <p class="card-text">
                      Enhance your mobile presence with high-performance custom
                      Android apps. Tailor solutions to meet business needs and
                      elevate interactions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flip-card4 service-card" style={{ 
              marginTop: "-192px",
              marginLeft: "41%",
              width: "28%",
              height: "190px"
            }}>
              <div class="flip-card-inner4">
                <div
                  class="flip-card-front4 rounded"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div class="card-body" style={{ textAlign: "center" }}>
                    <h5 class="card-title">DevOps Pipelines</h5>
                    <p class="card-text"></p>
                  </div>
                </div>
                <div
                  class="flip-card-back4 rounded"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div class="card-body" style={{ textAlign: "center" }}>
                    <p class="card-text">
                      Accelerate development and enhance efficiency with DevOps
                      & Automation practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flip-card5 service-card" style={{ marginTop: "7px" }}>
              <div class="flip-card-inner5">
                <div
                  class="flip-card-front5 rounded"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div class="card-body" style={{ textAlign: "center" }}>
                    <h5 class="card-title">Designing & Management</h5>
                    <p class="card-text"></p>
                  </div>
                </div>
                <div
                  class="flip-card-back5 rounded"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div class="card-body" style={{ textAlign: "center" }}>
                    <p class="card-text">
                      Creative designs, when strategically managed, have the
                      power to transform projects into visually appealing and
                      efficiently executed masterpieces. By marrying artistic
                      ingenuity with meticulous management, every project is
                      brought to life, ensuring both aesthetic beauty and
                      operational efficiency. This harmonious blend optimizes
                      resources while maximizing creative potential, turning
                      visionary ideas into tangible, successful outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={contactRef}
          className="portfolio-container fade-scale"
          style={{
            backgroundColor: "transparent",
            borderRadius: "15px",
            padding: "2%",
            textAlign: "center",
            width: "48%",
            marginLeft: "11%",
            marginTop: "30%",
            marginBottom: "5%",
          }}
        >
          <h1
            className="fade-in"
            style={{
              marginTop: "0%",
              marginLeft: "17%",
              marginRight: "20%",
              textAlign: "center",
              fontSize: "2vw",
              color: "#008080",
              marginBottom: "1%",
            }}
          >
            Contact Me!
          </h1>

          <form style={{ width: "90%", margin: "2%" }} onSubmit={handleSubmit}>
            <div class="form-group" style={{ marginBottom: "25px" }}>
              <label
                for="exampleInputEmail1"
                style={{
                  fontSize: "1.2rem",
                  color: "#2C3E50",
                  fontWeight: "500",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                value={formData.email}
                onChange={handleInputChange}
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                style={{
                  border: "2px solid #E8E8E8",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  width: "100%",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
              />
              <small
                id="emailHelp"
                class="form-text text-muted"
                style={{
                  fontSize: "0.85rem",
                  color: "#666",
                  marginTop: "5px",
                  fontStyle: "italic",
                }}
              >
                I'll never share your email with anyone else.
              </small>
            </div>
            <div class="form-group" style={{ marginBottom: "25px" }}>
              <label
                for="exampleInputText1"
                style={{
                  fontSize: "1.2rem",
                  color: "#2C3E50",
                  fontWeight: "500",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Message
              </label>
              <textarea
                class="form-control"
                id="exampleInputText1"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="Write me something :)"
                style={{
                  border: "2px solid #E8E8E8",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  width: "100%",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  resize: "vertical",
                  minHeight: "120px",
                }}
              ></textarea>
            </div>
            {submitStatus.error && (
              <div style={{ color: "#dc3545", marginBottom: "10px" }}>
                {submitStatus.error}
              </div>
            )}
            {submitStatus.success && (
              <div style={{ color: "#28a745", marginBottom: "10px" }}>
                Message sent successfully!
              </div>
            )}
            <button
              type="submit"
              class="btn btn-primary"
              disabled={submitStatus.loading}
              style={{
                backgroundColor: submitStatus.loading ? "#006666" : "#008080",
                border: "none",
                padding: "12px 30px",
                fontSize: "1.1rem",
                borderRadius: "25px",
                color: "#fff",
                cursor: submitStatus.loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                fontWeight: "500",
                letterSpacing: "0.5px",
                marginTop: "10px",
              }}
              onMouseOver={(e) =>
                !submitStatus.loading &&
                (e.currentTarget.style.backgroundColor = "#006666")
              }
              onMouseOut={(e) =>
                !submitStatus.loading &&
                (e.currentTarget.style.backgroundColor = "#008080")
              }
            >
              {submitStatus.loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div></div>
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
          backgroundImage: `url(${ai_pic})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "fixed",
          height: "100%",
          marginLeft: "60%",
          width: "40%",
        }}
      >
        // <button
        //   style={{
        //     height: "30px",
        //     border: "2px solid #E0A593",
        //     borderRadius: "20%",
        //     background: "#E0A593",
        //     color: "#8B4513",
        //     width: "50px",
        //     position: "absolute",
        //     right: "60px", // Adjust the distance from the right edge
        //     top: "10px", // Adjust the distance from the top edge
        //   }}
        // >
        //   {visitorCount}
        // </button>

        // <button
        //   style={{
        //     height: "30px",
        //     border: "2px solid #E0A593",
        //     borderRadius: "50%",
        //     background: "#E0A593",
        //     width: "30px",
        //     position: "absolute",
        //     right: "10px", // Adjust the distance from the right edge
        //     top: "10px", // Adjust the distance from the top edge
        //   }}
        //   onClick={openModal}
        // >
        //   <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     width="16"
        //     height="16"
        //     fill="#8B4513"
        //     class="bi bi-layers"
        //     viewBox="0 0 16 16"
        //     style={{ background: "transparent", marginTop: "-20%" }}
        //   >
        //     <path d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0zM8 9.433 1.562 6 8 2.567 14.438 6z" />
        //   </svg>
        // </button>
        // // <AIChat />
      </div>
    </div>
  );
}

export default Portfolio;
