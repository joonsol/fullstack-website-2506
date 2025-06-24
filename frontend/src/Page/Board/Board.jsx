import React, { useState, useMemo, useEffect } from "react";
import "./Board.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import translations from "../../Locale/Board.json"
const Board = () => {
  const [posts, setPosts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
 const [language, setLanguage] = useState(localStorage.getItem("language") || "ko");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://port-0-fullstack-website-2506-mca4f9ad87f2d72b.sel5.cloudtype.app/api/post")
        setPosts(response.data)
      } catch (error) {
        console.log("게시글 가져오기 실패:", error)
      }
    }
    fetchPosts()
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

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const value = post[searchType]?.toLowerCase() || "";
      const matchesSearch = value.includes(searchTerm.toLowerCase())

      const postDate = new Date(post.createdAt).getTime()
      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate).getTime() : null;

      const matchesDate = (!start || postDate >= start) && (!end || postDate <= end)

      return matchesSearch && matchesDate
    })

  }, [posts, searchTerm, searchType, startDate, endDate])


  const totalPages = pageSize > 0 ? Math.ceil(filteredPosts.length / pageSize) : 1;

  const pagenatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize)
  }, [filteredPosts, currentPage, pageSize])




  return (
    <div className="board">
      <h1>{translations[language].board.title}</h1>

      <div className="controls">
        <div className="filters">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="name">{translations[language].board.search.title}</option>

          </select>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text" placeholder={translations[language].board.search.placeholder} />
        </div>


      </div>
      <div className="date-filter-container">
        <div className="date-filter-group">
          <label className="date-label">{translations[language].board.search.dateStart}</label>
          <input
            type="date"
            className="date-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="date-filter-group">
          <label className="date-label">{translations[language].board.search.dateStart}:</label>
          <input
            type="date"
            className="date-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="count-wrap">
        <div className="total-count">총 {pagenatedPosts.length}{translations[language].board.search.itemsCount}</div>
        <select
          className="border rounded px-3 py-2"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>{`${size} ${translations[language].board.search.itemsCount}`}</option>
          ))}
        </select>
      </div>
      <ul className="post-list">
        <li className="post-header">
          <span className="col no">{translations[language].board.table.number}</span>
          <span className="col title">{translations[language].board.table.title}</span>
          <span className="col created">{translations[language].board.table.date}</span>
          <span className="col views">{translations[language].board.table.views}</span>
        </li>

        {pagenatedPosts.length === 0 ? (

          <li className="post-body">{translations[language].board.noPosts}</li>
        ) : (
          pagenatedPosts.map((post, index) => (

            <li onClick={() => { navigate(`/post/${post._id}`) }} key={post._id} className="post-row">
              <span className="col no">{(currentPage - 1) * pageSize + index + 1}</span>
              <span className="col title">{post.title}</span>
              <span className="col created">
                {new Date(post.createdAt).toLocaleString()}
              </span>
              <span className="col views">{post.views}</span>
            </li>

          ))
        )}
      </ul>


      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1 || totalPages === 0}
        >{translations[language].board.pagination.prev}</button>
        <span>
          {totalPages > 0 ? `${currentPage} / ${totalPages}` : "0/0"}
        </span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= totalPages || totalPages === 0}

        >
          {translations[language].board.pagination.next}
        </button>
      </div>
    </div>
  );
};

export default Board;
