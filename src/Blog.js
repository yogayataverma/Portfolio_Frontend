import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AnimatedCursor from "react-animated-cursor";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaSearch,
  FaLock,
  FaBell,
  FaTools,
  FaChartBar,
  FaRobot,
  FaRocket,
} from "react-icons/fa";
import { MdOutlineDesignServices } from "react-icons/md";
import { GiStraightPipe } from "react-icons/gi";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Blog.css";
import Loader from "./components/Loader";
import ProjectForm from "./components/ProjectForm";
import AdminLogin from "./components/AdminLogin";
import './Updates.css';  // We'll reuse the Updates styling

const FIXED_CATEGORIES = [
  {
    name: "Data Science Explorer",
    icon: "FaChartBar",
    id: "Data Science Explorer"
  },
  {
    name: "AI Enthusiast",
    icon: "FaRobot",
    id: "AI Enthusiast"
  },
  {
    name: "System Design",
    icon: "MdOutlineDesignServices ",
    id: "System Design"
  },
  {
  name: "CI/CD",
  icon: "GiStraightPipe",
  id: "CI/CD"
  }
];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  // Use a single state variable to track which post's comments are visible
  const [activeComment, setActiveComment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [showUpdates, setShowUpdates] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState(null);
  const [skillsByCategory, setSkillsByCategory] = useState({
    'data-science': [],
    'ai': []
  });

  console.log(setSkillsByCategory);
  console.log(skills);
  console.log(skillsLoading);
  console.log(setSkillsLoading);
  console.log(skillsByCategory);
  console.log(setSkillsError);
  console.log(skillsError);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://portfolio-backend-hdxw.onrender.com/api/projects');
        if (!response.ok) {
          throw new Error(HTTP error! status: ${response.status});
        }
        const data = await response.json();
        console.log('Fetched projects:', data);
        if (!Array.isArray(data)) {
          throw new Error('Expected array of posts');
        }
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  console.log('Current posts state:', posts);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = {};
        for (const post of posts) {
          const response = await axios.get(
            https://portfolio-backend-hdxw.onrender.com/api/projects/${post._id}/comments
          );
          commentsData[post._id] = response.data;
        }
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (posts.length > 0) {
      fetchComments();
    }
  }, [posts]);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    // Reset cursor style when component mounts
    document.body.style.cursor = "auto";

    return () => {
      // Cleanup when component unmounts
      document.body.style.cursor = "auto";
    };
  }, []);

  useEffect(() => {
    // TODO: Replace with actual API call when backend is ready
    const dummyUpdates = [
      {
        id: 1,
        title: "New Feature Release",
        date: "2024-03-20",
        description: "Launched new user dashboard with improved analytics",
        category: "Feature"
      },
      {
        id: 2,
        title: "Bug Fix Update",
        date: "2024-03-18",
        description: "Fixed performance issues in the mobile version",
        category: "Bug Fix"
      }
    ];
    setUpdates(dummyUpdates);
  }, []);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch('https://portfolio-backend-hdxw.onrender.com/api/updates');
        if (!response.ok) {
          throw new Error(HTTP error! status: ${response.status});
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Expected array of updates');
        }
        setUpdates(data);
      } catch (error) {
        console.error('Error fetching updates:', error);
        setUpdates([]);
      }
    };

    fetchUpdates();
  }, []);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setSkillsLoading(true);
      const response = await fetch('https://portfolio-backend-hdxw.onrender.com/api/skills');
      if (!response.ok) {
        throw new Error(HTTP error! status: ${response.status});
      }
      const data = await response.json();
      console.log('Raw skills data:', data); // Debug log
      
      if (!Array.isArray(data)) {
        throw new Error('Expected array of skills');
      }

      // Log the filtered data
      console.log('Data Science skills:', data.filter(skill => skill.category === 'data-science'));
      console.log('AI skills:', data.filter(skill => skill.category === 'ai'));
      
      setSkills(data);
      setSkillsLoading(false);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setSkillsError(error.message);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        https://portfolio-backend-hdxw.onrender.com/api/projects/like/${postId}
      );
      setPosts(
        posts.map((post) => (post._id === postId ? response.data : post))
      );
    } catch (err) {
      console.error("Error updating like:", err);
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const response = await axios.post(
        https://portfolio-backend-hdxw.onrender.com/api/projects/${postId}/comments,
        {
          content: commentInputs[postId],
        }
      );

      if (response.status === 201) {
        setPosts(
          posts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                comments: (post.comments || 0) + 1,
              };
            }
            return post;
          })
        );

        const updatedComments = { ...comments };
        if (!updatedComments[postId]) {
          updatedComments[postId] = [];
        }
        updatedComments[postId].push({
          id: response.data.comment.id,
          content: commentInputs[postId],
          createdAt: new Date().toISOString(),
        });
        setComments(updatedComments);

        setCommentInputs((prev) => ({
          ...prev,
          [postId]: "",
        }));
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again.");
    }
  };

  // Toggle comments so that only one post's comment section is visible at a time.
  const toggleComments = (postId) => {
    setActiveComment((prev) => (prev === postId ? null : postId));
  };

  // Add this filter function
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectSubmitted = (newProject) => {
    setPosts([newProject, ...posts]);
  };

  const handleAdminClick = () => {
    setShowAdminLogin(true);
  };

  const addUpdate = async (updateData) => {
    try {
      const response = await axios.post('https://portfolio-backend-hdxw.onrender.com/api/updates', updateData);
      setUpdates(prevUpdates => [{
        id: response.data._id,
        title: response.data.title,
        description: response.data.description,
        category: response.data.category,
        date: new Date(response.data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }, ...prevUpdates]);
    } catch (error) {
      console.error('Error adding update:', error);
    }
  };

  console.log(addUpdate);

  const handleOverlayClick = (e) => {
    // Only close if clicking the overlay background itself
    if (e.target.className === 'admin-section') {
      setShowAdminLogin(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) return <div className="error">{error}</div>;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Example of how to make a chat API request
  const fetchChatResponse = async (message) => {
    try {
      const response = await fetch('https://portfolio-backend-hdxw.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(HTTP error! status: ${response.status});
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching chat response:', error);
      throw error;
    }
  };

  console.log(fetchChatResponse);

  return (
    <div className="blog-container">
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        color="193, 11, 111"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={1.5}
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
        ]}
      />

      <div className="skills-toggle" onClick={() => setShowSkills(!showSkills)}>
        <FaTools />
      </div>

      <div className={skills-sidebar ${showSkills ? 'show' : ''}}>
        <div className="skills-sidebar-header">
          <h2>Hobbyist Projects</h2>
          <button className="close-sidebar" onClick={() => setShowSkills(false)}>×</button>
        </div>
        
        {skillsLoading ? (
          <div className="loading">Loading skills...</div>
        ) : skillsError ? (
          <div className="error">
            <p>Error loading skills: {skillsError}</p>
            <button onClick={fetchSkills}>Try Again</button>
          </div>
        ) : (
          <>
            <div className="hobbyist-intro">
              <div className="hobby-icon">
                <FaRocket />
              </div>
              <p>Exploring the intersection of data, AI, and creativity in my spare time</p>
            </div>

            {FIXED_CATEGORIES.map((category) => {
              const categorySkills = skills.filter(skill => skill.name === category.id);
              
              return (
                <div key={category.id} className="expertise-category">
                  <h3>
                    <span className="category-icon">
                      {category.icon === 'FaChartBar' && <FaChartBar />}
                      {category.icon === 'FaRobot' && <FaRobot />}
                      {category.icon === 'MdOutlineDesignServices' && <MdOutlineDesignServices  />}
                      {category.icon === 'GiStraightPipe' && <GiStraightPipe  />}
                    </span>
                    {category.name}
                  </h3>
                  <div className="expertise-items">
                    {categorySkills.length > 0 ? (
                      categorySkills.map((skill) => (
                        <div key={skill._id} className="expertise-card">
                          {skill.skills.map((subSkill, index) => (
                            <div key={index} className="skill-item">
                              <div className="card-header">
                                <h4>{subSkill.title}</h4>
                                <span className="tech-badge">{subSkill.technology}</span>
                              </div>
                              <p>{subSkill.description}</p>
                              <ul style={{listStyleType: 'none'}}>
                                {subSkill.bulletPoints && subSkill.bulletPoints.map((point, index) => (
                                  <li key={index}>{point}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ))
                    ) : (
                      <div className="no-skills-message">
                        No skills added for this category yet.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      <div className="notification-bell" onClick={() => setShowUpdates(!showUpdates)}>
        <FaBell />
        <span className="update-count">{updates.length}</span>
      </div>

      <div className={updates-sidebar ${showUpdates ? 'show' : ''}}>
        <div className="updates-sidebar-header">
          <h2 className="section-title">Latest Updates</h2>
          <button className="close-sidebar" onClick={() => setShowUpdates(false)}>×</button>
        </div>
        <div className="updates-list">
          {updates.map((update) => (
            <div key={update.id} className="update-card">
              <div className="update-header">
                <h3>{update.title}</h3>
                <span className="update-date">
                  {new Date(update.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <span className="update-category">{update.category}</span>
              <p className="update-description">{update.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="projects-container">
        <div className="projects-header">
          <h1>Recent Projects</h1>
          <div className="header-underline"></div>
          {!isAdmin && (
            <button
              className="admin-login-trigger"
              onClick={handleAdminClick}
              title="Admin Login"
            >
              <FaLock />
            </button>
          )}
        </div>

        {showAdminLogin && !isAdmin && (
          <div className="admin-section" onClick={handleOverlayClick}>
            <div className="admin-login-container">
              <AdminLogin
                onLogin={(success) => {
                  setIsAdmin(success);
                  setShowAdminLogin(false);
                }}
              />
            </div>
          </div>
        )}

        {isAdmin && <ProjectForm onProjectSubmitted={handleProjectSubmitted} />}

        <div className="search-container">
          <FaSearch
            style={{
              position: "absolute",
              left: "35px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#e07e36",
              fontSize: "18px",
            }}
          />
          <input
            type="text"
            placeholder="Search projects..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="projects-grid">
          {filteredPosts.map((post) => (
            <Card key={post._id} className="project-card">
              <div className="card-image-container">
                {post.imageUrl && (
                  <Card.Img
                    variant="top"
                    src={post.imageUrl}
                    alt={post.title}
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400?text=Project+Image";
                      console.error("Error loading image for project:", post.title);
                    }}
                  />
                )}
              </div>
              <Card.Body>
                <Card.Title className="project-title">{post.title}</Card.Title>
                <div className="post-timestamp">
                  {formatDate(post.timestamp)}
                </div>
                <Card.Text className="project-description">
                  {post.content}
                </Card.Text>
                <div className="project-links">
                  {post.githubLink && (
                    <Button
                      href={post.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-link-btn"
                    >
                      GitHub
                    </Button>
                  )}
                  {post.demoLink && (
                    <Button
                      href={post.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-link-btn"
                    >
                      Live Demo
                    </Button>
                  )}
                </div>
                <div className="post-interactions">
                  <button
                    className={interaction-btn ${post.isLiked ? "liked" : ""}}
                    onClick={() => handleLike(post._id)}
                  >
                    {post.isLiked ? <FaHeart /> : <FaRegHeart />}
                    <span>{post.likes}</span>
                  </button>
                  <button
                    className="interaction-btn"
                    onClick={() => toggleComments(post._id)}
                  >
                    <FaRegComment />
                    <span>{post.comments}</span>
                  </button>
                </div>
                {activeComment === post._id && (
                  <div className="comments-section">
                    <h3>Comments</h3>
                    <div className="comment-form">
                      <div className="comment-input-container">
                        <textarea
                          className="comment-textarea"
                          value={commentInputs[post._id] || ""}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({
                              ...prev,
                              [post._id]: e.target.value,
                            }))
                          }
                          placeholder="Share your thoughts..."
                          rows={1}
                          onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height =
                              Math.min(e.target.scrollHeight, 120) + "px";
                          }}
                        />
                        {commentInputs[post._id]?.trim() && (
                          <div className="comment-form-actions">
                            <button
                              onClick={() => handleCommentSubmit(post._id)}
                              disabled={!commentInputs[post._id]?.trim()}
                            >
                              Comment
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="comments-list">
                      {comments[post._id]?.length > 0 ? (
                        comments[post._id].map((comment) => (
                          <div key={comment.id} className="comment">
                            <div className="comment-dot"></div>
                            <div className="comment-content">
                              <span className="comment-timestamp">
                                {new Date(comment.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                              <p>{comment.content}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-comments-message">
                          <FaRegComment />
                          <p>No replies yet. Start the conversation!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
