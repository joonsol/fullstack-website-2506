// src/Components/Forum/Forum.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Forum.scss";
import axios from "axios";
import translations from "../../Locale/Forum.json"

import { motion } from "framer-motion";
const Forum = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const [language, setLanguage] = useState(localStorage.getItem("language") || "ko");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/post`)
        setPosts(response.data.slice(0, 5))
      } catch (error) {
        console.error("게시글 로딩 실패", error)

      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [])

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "ko")
    }
    window.addEventListener("languageChange", handleLanguageChange)
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange)
    }
  }, [])
  return (
    <div className="forum">
      <div className="forum-container">
        <div className="forum-title">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >{translations[language].forum.title}</motion.h2>
        </div>

        <div className="forum-actions">
          <Link to="/board" className="view-all" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {translations[language].forum.viewAll}
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="forum-posts">
          {loading ? (
            <div>
              {translations[language].forum.loading}
            </div>
          ) : posts.length === 0 ? (
            <div> {translations[language].forum.noRecentPosts}</div>
          ) : (
            posts.map((post) => (
              <motion.div key={post._id} className="forum-post">
                <Link to={`/post/${post._id}`}>
                  <div className="forum-post-inner">
                    <div className="forum-post-content">
                      <div className="forum-meta">
                        <span>
                          {translations[language].forum.postInfo.number}
                          . {post.number}</span>
                        <span>
                          {translations[language].forum.postInfo.views}
                          : {post.views}</span>
                        {post.fileUrl.length > 0 && <span>

                          {translations[language].forum.postInfo.files}
                          :

                          {post.fileUrl.length}</span>}
                      </div>
                      <h3 className="post-title">{post.title}</h3>
                      <div className="post-date">{post.createdAt}</div>
                    </div>
                    <div className="forum-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>

              </motion.div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default Forum;
