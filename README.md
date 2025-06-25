# 🧩 Fullstack Website 2506

React + Express + MongoDB 기반의 포트폴리오 웹사이트 프로젝트입니다.  
프론트엔드는 Vercel, 백엔드는 Cloudtype에 배포되었으며, 이미지 및 파일 업로드는 **AWS S3 버킷**을 통해 처리됩니다.

---

## 🚀 배포 주소

- 프론트엔드: [https://fullstack-website-2506.vercel.app/](https://fullstack-website-2506.vercel.app/)
- 백엔드 API: [https://port-0-fullstack-website-2506-mca6c151ccd16ffe.sel5.cloudtype.app/](https://port-0-fullstack-website-2506-mca6c151ccd16ffe.sel5.cloudtype.app/)

---

## 🛠 주요 기능

- 게시글 CRUD (관리자 페이지 포함)
- 이미지/파일 업로드 기능 (AWS S3)
- 사용자 인증 (JWT 기반)
- 반응형 UI (SCSS 사용)
- 관리자 로그인 및 게시글 관리 페이지

---

## 🌐 기술 스택

| 구분        | 기술                                 |
|-------------|--------------------------------------|
| Frontend    | React, React Router, Axios, SCSS     |
| Backend     | Node.js, Express, MongoDB (Mongoose) |
| Auth        | JWT (JSON Web Token)                 |
| File Upload | AWS S3, Multer, @aws-sdk/client-s3   |
| Deployment  | Vercel (FE), Cloudtype (BE)          |

---

## 📁 이미지 업로드 (AWS S3)

- 이미지 또는 파일은 서버에서 직접 저장하지 않고 **AWS S3 버킷**에 업로드됩니다.
- 업로드된 파일은 공개 URL로 제공되어 클라이언트에서 직접 접근할 수 있습니다.
- `@aws-sdk/client-s3`와 `multer`를 사용하여 Express 서버에서 업로드 처리
- 파일 경로는 S3 버킷 URL을 통해 클라이언트에 전달됩니다.

---

## 🧪 실행 방법 (로컬 개발)

1. `.env` 파일 생성

```bash
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>

AWS_ACCESS_KEY_ID=<your_aws_access_key>
AWS_SECRET_ACCESS_KEY=<your_aws_secret_key>
AWS_BUCKET_NAME=<your_bucket_name>
AWS_REGION=ap-northeast-2
