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
  { name: "Data Science Explorer", icon: "FaChartBar", id: "Data Science Explorer" },
  { name: "AI Enthusiast", icon: "FaRobot", id: "AI Enthusiast" },
  { name: "System Design", icon: "MdOutlineDesignServices", id: "System Design" },
  { name: "CI/CD", icon: "GiStraightPipe", id: "CI/CD" }
];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [activeComment, setActiveComment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("none");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [showUpdates, setShowUpdates] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState(null);
  const [skillsByCategory, setSkillsByCategory] = useState({ 'data-science': [], 'ai': [] });

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://portfolio-backend-hdxw.onrender.com/api/projects');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = {};
        for (const post of posts) {
          const res = await axios.get(
            `https://portfolio-backend-hdxw.onrender.com/api/projects/${post._id}/comments`
          );
          commentsData[post._id] = res.data;
        }
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    if (posts.length) fetchComments();
  }, [posts]);

  // Check admin auth
  useEffect(() => {
    if (localStorage.getItem("authToken")) setIsAdmin(true);
  }, []);

  // Initialize dummy updates
  useEffect(() => {
    setUpdates([
      { id: 1, title: "New Feature Release", date: "2024-03-20", description: "Launched new user dashboard with improved analytics", category: "Feature" },
      { id: 2, title: "Bug Fix Update", date: "2024-03-18", description: "Fixed performance issues in the mobile version", category: "Bug Fix" }
    ]);
  }, []);

  // Fetch updates
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch('https://portfolio-backend-hdxw.onrender.com/api/updates');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setUpdates(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching updates:', error);
      }
    };
    fetchUpdates();
  }, []);

  // Fetch skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setSkillsLoading(true);
        const response = await fetch('https://portfolio-backend-hdxw.onrender.com/api/skills');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setSkills(Array.isArray(data) ? data : []);
      } catch (error) {
        setSkillsError(error.message);
      } finally {
        setSkillsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(
        `https://portfolio-backend-hdxw.onrender.com/api/projects/like/${postId}`
      );
      setPosts(posts.map(p => p._id === postId ? res.data : p));
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const res = await axios.post(
        `https://portfolio-backend-hdxw.onrender.com/api/projects/${postId}/comments`,
        { content: commentInputs[postId] }
      );
      if (res.status === 201) {
        setPosts(posts.map(p => p._id === postId ? { ...p, comments: (p.comments || 0) + 1 } : p));
        setComments(prev => ({
          ...prev,
          [postId]: [...(prev[postId] || []), { id: res.data.comment.id, content: commentInputs[postId], createdAt: new Date().toISOString() }]
        }));
        setCommentInputs(prev => ({ ...prev, [postId]: "" }));
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again.");
    }
  };

  const toggleComments = (postId) => setActiveComment(prev => prev === postId ? null : postId);

  // Filter posts by search term
  const filteredPosts = posts.filter(
    post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortOption) {
      case 'nameAsc': return a.title.localeCompare(b.title);
      case 'nameDesc': return b.title.localeCompare(a.title);
      case 'dateAsc': return new Date(a.timestamp) - new Date(b.timestamp);
      case 'dateDesc': return new Date(b.timestamp) - new Date(a.timestamp);
      default: return 0;
    }
  });

  const handleProjectSubmitted = (newProject) => setPosts([newProject, ...posts]);

  const handleAdminClick = () => setShowAdminLogin(true);

  const addUpdate = async (updateData) => {
    try {
      const res = await axios.post('https://portfolio-backend-hdxw.onrender.com/api/updates', updateData);
      setUpdates(prev => [{
        id: res.data._id,
        title: res.data.title,
        description: res.data.description,
        category: res.data.category,
        date: new Date(res.data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      }, ...prev]);
    } catch (error) {
      console.error('Error adding update:', error);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'admin-section') setShowAdminLogin(false);
  };

  const formatDate = date => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="blog-container">
      <AnimatedCursor innerSize={8} outerSize={35} color="193, 11, 111" outerAlpha={0.2} innerScale={0.7} outerScale={1.5} clickables={[
        "a","input[type=\"text\"]","input[type=\"email\"]","input[type=\"number\"]","input[type=\"submit\"]","label[for]","select","textarea","button",".link"
      ]} />

      {/* Skills Toggle and Sidebar omitted for brevity */}

      <div className="notification-bell" onClick={() => setShowUpdates(!showUpdates)}>
        <FaBell /><span className="update-count">{updates.length}</span>
      </div>

      {/* Updates Sidebar omitted for brevity */}

      <div className="projects-container">
        <div className="projects-header">
          <h1>Recent Projects</h1>
          <div className="header-underline"></div>
          {!isAdmin && (<button className="admin-login-trigger" onClick={handleAdminClick} title="Admin Login"><FaLock /></button>)}
        </div>

        {showAdminLogin && !isAdmin && (
          <div className="admin-section" onClick={handleOverlayClick}>
            <div className="admin-login-container">
              <AdminLogin onLogin={success => { setIsAdmin(success); setShowAdminLogin(false); }} />
            </div>
          </div>
        )}

        {isAdmin && <ProjectForm onProjectSubmitted={handleProjectSubmitted} />}

        <div className="controls-container">
          <div className="search-container">
            <FaSearch style={{ position: "absolute", left: "35px", top: "50%", transform: "translateY(-50%)", color: "#e07e36", fontSize: "18px" }} />
            <input
              type="text"
              placeholder="Search projects..."
              className="search-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sort-container">
            <label htmlFor="sortSelect">Sort by:</label>
            <select id="sortSelect" value={sortOption} onChange={e => setSortOption(e.target.value)}>
              <option value="none">None</option>
              <option value="nameAsc">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
              <option value="dateAsc">Date (Oldest)</option>
              <option value="dateDesc">Date (Newest)</option>
            </select>
          </div>
        </div>

        <div className="projects-grid">
          {sortedPosts.map(post => (
            <Card key={post._id} className="project-card">
              <div className="card-image-container">
                {post.imageUrl && (<Card.Img variant="top" src={post.imageUrl} alt={post.title} onError={e => { e.target.src = "https://placehold.co/600x400?text=Project+Image"; }} />)}
              </div>
              <Card.Body>
                <Card.Title className="project-title">{post.title}</Card.Title>
                <div className="post-timestamp">{formatDate(post.timestamp)}</div>
                <Card.Text className="project-description">{post.content}</Card.Text>
                <div className="project-links">
                  {post.githubLink && (<Button href={post.githubLink} target="_blank" rel="noopener noreferrer" className="github-link-btn">GitHub</Button>)}
                  {post.demoLink && (<Button href={post.demoLink} target="_blank" rel="noopener noreferrer" className="demo-link-btn">Live Demo</Button>)}
                </div>
                <div className="post-interactions">
                  <button className={`interaction-btn ${post.isLiked ? "liked" : ""}`} onClick={() => handleLike(post._id)}>
                    {post.isLiked ? <FaHeart /> : <FaRegHeart />}<span>{post.likes}</span>
                  </button>
                  <button className="interaction-btn" onClick={() => toggleComments(post._id)}>
                    <FaRegComment /><span>{post.comments}</span>
                  </button>
                </div>
                {/* Comments Section omitted for brevity */}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
