import "./SinglePost.scss"
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Divider,
  Box,
  Chip,
  Skeleton,
  IconButton,
  Snackbar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import { format } from "date-fns";
import "./SinglePost.scss";



const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await axios.get(`http://localhost:3000/api/post/${id}`);
        setPost(postResponse.data);
      } catch (error) {
        console.error("게시글 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleFileDownload = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setOpenSnackbar(true);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" className="single-post-container">
        <Paper elevation={2} className="single-post-paper">
          <Skeleton variant="text" height={60} />
          <Skeleton variant="text" width="60%" />
          <Divider className="single-post-divider" />
          <Skeleton variant="rectangular" height={200} />
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="single-post-container">
      <Box className="post-nav">
        <IconButton onClick={() => navigate(-1)} aria-label="뒤로가기">
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={handleShare} aria-label="공유하기">
          <ShareIcon />
        </IconButton>
      </Box>

      <Paper elevation={2} className="single-post-paper">
        <Box className="post-header">
          <Box className="post-meta">
            <Box className="post-info">
              <Typography variant="body2" color="text.secondary">
                No. {post.number}
              </Typography>
              <Box className="post-views">
                <VisibilityIcon className="icon" />
                <Typography variant="body2" color="text.secondary">
                  {post.views}
                </Typography>
              </Box>
            </Box>
            <Typography variant="h5" component="h1" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body2" className="post-date">
              {format(new Date(post.createdAt), "yyyy-MM-dd HH:mm:ss")}
            </Typography>
          </Box>
        </Box>

        <Divider className="single-post-divider" />

        <Box className="post-content">
          <div
            dangerouslySetInnerHTML={{ __html: post.renderedContent }}
            className="content-html"
          />
        </Box>

        {post.fileUrl && post.fileUrl.length > 0 && (
          <Box className="post-attachments">
            <Typography variant="subtitle2" gutterBottom>
              첨부파일
            </Typography>
            <Box className="attachment-list">
              {post.fileUrl.map((file, index) => (
                <Chip
                  key={index}
                  label={file.split("/").pop()}
                  variant="outlined"
                  clickable
                  onClick={() => handleFileDownload(file)}
                  icon={<FileDownloadIcon />}
                />
              ))}
            </Box>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="URL이 클립보드에 복사되었습니다"
      />
    </Container>
  );
};

export default SinglePost;
