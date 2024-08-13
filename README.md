# 알바솔로몬 설문조사 및 문의사항 백엔드 API

이 프로젝트는 알바솔로몬의 설문조사 및 문의사항을 처리하는 백엔드 API를 구현한 것입니다. 이 API는 사용자가 상담을 신청하고 설문 응답을 제출할 수 있도록 지원합니다.

## 프로젝트 구조

- **`src/app.js`**: Express 애플리케이션의 엔트리 포인트입니다.
- **`src/routers/consultationResponses.js`**: 상담 요청을 처리하는 라우터입니다.
- **`src/routers/surveyResponses.js`**: 설문 응답을 처리하는 라우터입니다.
- **`src/utils/index.js`**: Prisma 클라이언트를 포함한 유틸리티 파일입니다.

## 기술 스택

- Node.js
- Express
- Prisma (ORM)
- PostgreSQL
- CORS (Cross-Origin Resource Sharing)