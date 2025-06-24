import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminNavbar.scss"; // SCSS 파일 연결

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/admin");
      }
    } catch (error) {
      console.log("로그아웃 실패: ", error);
    }
  };

  return (
    <div className="admin-navbar">
      <div className="admin-navbar-container">
        <div className="admin-navbar-inner">
          <div className="logo">
            <Link to="/admin/posts" className="logo-text">
              관리자 페이지
            </Link>
          </div>

          <div className="nav-links desktop">
            <Link to="/admin/posts">게시글</Link>
            <Link to="/admin/contacts">문의 관리</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </div>

          <div className="mobile-toggle">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="nav-links mobile">
            <Link to="/admin/posts" onClick={() => setIsOpen(false)}>
              게시글
            </Link>
            <Link to="/admin/contacts" onClick={() => setIsOpen(false)}>
              문의 관리
            </Link>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
