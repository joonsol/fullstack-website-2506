import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./AdminLogin.scss"; // SCSS 연결
import axios from "axios"
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const naviagate = useNavigate()
  const hadleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(formData)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", formData, {
        withCredentials: true,
      })
      if (response.data.user) {
        naviagate("/admin/posts")
      }
    } catch (error) {
      const errorMessage = error.response.data.message || "로그인에 실패"
      const remainingAttempts = error.response.data.remainingAttempts;

      setError({
        message: errorMessage,
        remainingAttempts: remainingAttempts
      })
    }

  }
  return (
    <div className="admin-login">
      <div className="login-box">
        <div className="login-header">
          <h2>관리자 로그인</h2>
          <p>관리자 전용 페이지입니다.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-field">
              <label htmlFor="username">관리자 아이디</label>
              <input
                id="username"
                name="username"
               
                type="text"
                required
                placeholder="관리자 아이디"
                value={formData.username}
                onChange={hadleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">관리자 비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                   value={formData.password}
                onChange={hadleChange}
                placeholder="관리자 비밀번호"
              />
            </div>
          </div>

          {error && (
            <div className="error-box">
              {typeof error === "string" ? error : error.message}
              {error.remainingAttempts !== undefined && (
                <div className="retry-count">
                  남은 시도 횟수: {error.remainingAttempts}회
                </div>
              )}
            </div>
          )}

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
