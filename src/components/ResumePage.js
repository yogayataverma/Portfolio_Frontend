import React from "react";
import rocks from "../island_enhanced.webp";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaDownload,
} from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { IoCodeOutline } from "react-icons/io5";
import AnimatedCursor from "react-animated-cursor";

// Import the timeline components and stylesheet
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FiBook } from "react-icons/fi";
import { LuBookmark } from "react-icons/lu";
import { MdOutlineWorkOutline } from "react-icons/md";

const ResumePage = () => {
  const downloadResume = () => {
    const resumeUrl = "/Resume.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "YogayataVerma.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats values (update these as needed)
  const stats = [
    { label: "Years of Experience", value: "1+" },
    { label: "Problems Solved", value: "2,000+" },
    { label: "Projects", value: "40+" },
    { label: "Technologies Used", value: "20+" },
  ];

  // Timeline events data (customize as needed)
  const timelineEvents = [
    {
      date: "2020",
      title: "Began Coding Journey",
      description:
        "Started exploring the world of programming, building small projects and learning the fundamentals.",
      icon: <IoCodeOutline />,
    },
    {
      date: "2021",
      title: "First Major Project & Completed BCA",
      description:
        "Developed my first full-stack application and learned about client-server architecture.",
      icon: <FiBook />,
    },
    {
      date: "2023",
      title: "Completed MCA & EXL Services Internship Opportunity",
      description:
        "Contributed to a dynamic team in EXL Services, where I worked on innovative projects.",
      icon: <LuBookmark />,
    },
    {
      date: "2024",
      title: "Impinge Solutions",
      description:
        "Leveraged my role as a full-time employee to deepen my expertise by actively contributing to a diverse range of challenging projects.",
      icon: <MdOutlineWorkOutline />,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${rocks})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "1rem",
        overflowY: "auto",
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

      <div
        style={{
          maxWidth: "2000px",
          margin: "0 auto",
          borderRadius: "20px",
          padding: "1.5rem",
        }}
      >
        {/* Timeline Section */}
        <div style={{ marginBottom: "3.5rem" }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              color: "#008080",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontWeight: "700",
            }}
          >
            My Journey
          </h2>
          <VerticalTimeline>
            {timelineEvents.map((event, index) => (
              <VerticalTimelineElement
                key={index}
                contentStyle={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,245,245,0.95))",
                  color: "#333",
                  borderRadius: "10px",
                  padding: "1.5rem",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  border: "1px solid #e0e0e0",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(245,245,245,0.95)",
                }}
                date={event.date}
                dateClassName="timeline-date"
                iconStyle={{
                  background: "#008080",
                  color: "#fff",
                  display: "flex",
                  fontSize: "1.2em",
                }}
                icon={event.icon}
              >
                <h3
                  style={{
                    marginBottom: "0.5rem",
                    fontFamily:
                      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontWeight: "600",
                    color: "#008080",
                  }}
                >
                  {event.title}
                </h3>
                <p style={{ lineHeight: "1.5", fontSize: "1em" }}>
                  {event.description}
                </p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>

        {/* Header & Enhanced Contact Panel */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <p
            style={{
              color: "#556B2F",
              fontSize: "1.1em",
              marginBottom: "1.5rem",
              fontStyle: "italic",
              maxWidth: "800px",
              margin: "0 auto 2rem",
              padding: "0 1rem",
            }}
          >
            "Within every line of code lies a spark of creativity, igniting
            pathways to a future where dreams and innovation intertwine."
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
              padding: "1rem",
              borderRadius: "15px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {/* Gmail Card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "0.8rem 1.2rem",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.8)",
                transition: "transform 0.3s ease, background 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                minWidth: "auto",
                flex: "1 1 auto",
                maxWidth: "300px",
                margin: "0.5rem",
              }}
              onClick={() =>
                window.open("mailto:yogayatajugnu@gmail.com", "_blank")
              }
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "rgba(255,255,255,1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.8)";
              }}
            >
              <FaEnvelope style={{ color: "#008080", fontSize: "1.4em" }} />
              <span style={{ fontSize: "1.1em", color: "#333", textAlign: "center", flex: "1" }}>
                yogayatajugnu@gmail.com
              </span>
            </div>
            {/* Phone Card (WhatsApp) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.8rem",
                padding: "1.2rem 1.2rem",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.8)",
                transition: "transform 0.3s ease, background 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                minWidth: "auto",
                flex: "1 1 auto",
                maxWidth: "300px",
                margin: "0.5rem",
              }}
              onClick={() =>
                window.open("https://wa.me/917986258542", "_blank")
              }
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "rgba(255,255,255,1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.8)";
              }}
            >
              <FaPhone style={{ color: "#008080", fontSize: "1.2em" }} />
              <span style={{ 
                color: "#333",
                textAlign: "center",
                flex: "1",
              }}>
                +91 7986258542
              </span>
            </div>
            {/* Location Card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "0.8rem 1.2rem",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.8)",
                transition: "transform 0.3s ease, background 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                minWidth: "auto",
                flex: "1 1 auto",
                maxWidth: "300px",
                margin: "0.5rem",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "rgba(255,255,255,1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.8)";
              }}
            >
              <FaMapMarkerAlt style={{ color: "#008080", fontSize: "1.2em" }} />
              <span style={{ color: "#333" , textAlign: "center", flex: "1" }}>Zirakpur, Punjab</span>
            </div>
            {/* LinkedIn Card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "0.8rem 1.2rem",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.8)",
                transition: "transform 0.3s ease, background 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                minWidth: "auto",
                flex: "1 1 auto",
                maxWidth: "300px",
                margin: "0.5rem",
              }}
              onClick={() =>
                window.open("https://www.linkedin.com/in/yverma2000/", "_blank")
              }
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "rgba(255,255,255,1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.8)";
              }}
            >
              <ImLinkedin style={{ color: "#008080", fontSize: "1.4em" }} />
              <span style={{ fontSize: "1.1em", color: "#333", textAlign: "center", flex: "1"}}>
                LinkedIn Profile
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div style={{ marginBottom: "3rem", marginTop: "3rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1rem",
              padding: "1rem",
              justifyContent: "center",
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(243,225,206,0.7), rgba(255,228,196,0.7))",
                  padding: "1.5rem",
                  borderRadius: "20px",
                  textAlign: "center",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                  border: "1px solid #E07E36",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 25px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.05)";
                }}
              >
                <h3
                  style={{
                    color: "#008080",
                    marginBottom: "0.8rem",
                    fontSize: "1.8em",
                    fontWeight: "700",
                  }}
                >
                  {stat.value}
                </h3>
                <p
                  style={{
                    color: "#556B2F",
                    fontSize: "1em",
                    fontWeight: "500",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Resume Section */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p
            style={{
              color: "#556B2F",
              marginBottom: "1.5rem",
              fontSize: "1em",
              padding: "0 1rem",
            }}
          >
            Explore a comprehensive view of my skills, experiences, and
            achievements.
          </p>
          <button
            onClick={downloadResume}
            style={{
              padding: "0.8rem 2rem",
              fontSize: "1.1rem",
              borderRadius: "50px",
              border: "none",
              background: "linear-gradient(135deg, #008080 0%, #006666 100%)",
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 15px rgba(0, 128, 128, 0.2)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.8rem",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 12px 20px rgba(0, 128, 128, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 15px rgba(0, 128, 128, 0.2)";
            }}
          >
            <FaDownload /> Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
