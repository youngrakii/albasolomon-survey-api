# 알바솔로몬 설문조사 및 상담 신청 백엔드 API

"알바솔로몬" 랜딩페이지에서 사용되는 **설문조사 응답 수집** 및 **상담 신청 접수**를 처리하는 REST API 서버입니다.

## 기술 스택

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express 4
- **ORM**: Prisma 5
- **Database**: PostgreSQL
- **기타**: dotenv, cors, prettier

## 프로젝트 구조

```
albasolomon-survey-api/
├── prisma/
│   └── schema.prisma          # DB 스키마 정의 (모델, Enum)
├── src/
│   ├── routers/
│   │   ├── consultationResponses.js  # 상담 신청 라우터
│   │   └── surveyResponses.js        # 설문 응답 라우터
│   ├── utils/
│   │   └── index.js                  # Prisma 클라이언트 초기화
│   └── app.js                        # Express 앱 엔트리 포인트
├── .env                              # 환경 변수 (git 제외)
├── .gitignore
├── .prettierrc
└── package.json
```

## 시작하기

### 사전 요구사항

- Node.js
- PostgreSQL 데이터베이스

### 설치 및 실행

```bash
# 의존성 설치
npm install

# .env 파일 생성
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
# PORT=3000 (선택, 기본값 3000)

# Prisma 클라이언트 생성 및 DB 마이그레이션
npx prisma generate
npx prisma db push

# 서버 실행
npm start
```

## 환경 변수

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `DATABASE_URL` | PostgreSQL 연결 문자열 | O |
| `PORT` | 서버 포트 (기본값: 3000) | X |

## API 엔드포인트

모든 엔드포인트는 `/api` 접두사를 사용합니다.

### 설문 응답 (Survey Responses)

#### `POST /api/responses` — 설문 응답 제출

**Request Body:**

```json
{
  "corporationType": "PRIVATE | SMALLFRANCHISE | LARGEFRANCHISE | ETC",
  "employeeNumber": "LESS5 | MORE5LESS20 | MORE21",
  "question1Answer": "string (필수)",
  "question2Answer": "string (필수)",
  "question3Answer": "string (필수)",
  "question4Answer": "string (선택)",
  "question5Answer": "string (선택)",
  "question6Answer": "string (필수)",
  "question7Answer": "string (필수)",
  "question8Answer": "string (선택)",
  "question9Answer": "string (필수)",
  "question10Answer": "string (선택)",
  "question11Answer": "string (필수)",
  "question12Answer": "string (선택)"
}
```

**응답:**

- `201` — 등록 성공
- `400` — 필수 문항 누락
- `500` — 서버 오류

#### `GET /api/responses` — 설문 응답 전체 조회 (페이지네이션)

**Query Parameters:**

- `page` (기본값: 1) — 페이지 번호
- `order` (기본값: desc) — 정렬 순서 (`asc` | `desc`)

페이지당 5건씩 반환됩니다.

**응답:**

- `200` — 조회 성공

---

### 상담 신청 (Consultation Responses)

#### `POST /api/consultations` — 상담 신청

**Request Body:**

```json
{
  "name": "string (필수)",
  "contact": "string (필수)",
  "email": "string (선택)",
  "timeSlot": "NINETOTEN | TENTOELEVEN | ELEVENTOTWELVE | TWELVETOTHIRTEEN | THIRTEENTOFIFTEEN | FOURTEENTOFIFTEEN | FIFTEENTOSIXTEEN",
  "message": "string (선택)"
}
```

**TimeSlot 값:**

- `NINETOTEN` — 9~10시
- `TENTOELEVEN` — 10~11시
- `ELEVENTOTWELVE` — 11~12시
- `TWELVETOTHIRTEEN` — 12~13시
- `THIRTEENTOFIFTEEN` — 13~14시
- `FOURTEENTOFIFTEEN` — 14~15시
- `FIFTEENTOSIXTEEN` — 15~16시

**응답:**

- `201` — 신청 성공
- `400` — 필수 항목 누락 또는 잘못된 시간대
- `500` — 서버 오류

#### `GET /api/consultations` — 상담 신청 전체 조회

**응답:**

- `200` — 조회 성공

## 데이터베이스 스키마

### SurveyResponses

- `responseId` (Int, PK, Auto Increment)
- `corporationType` (Enum: PRIVATE, SMALLFRANCHISE, LARGEFRANCHISE, ETC)
- `employeeNumber` (Enum: LESS5, MORE5LESS20, MORE21)
- `question1Answer` ~ `question12Answer` (String, 일부 선택)

### ConsultationResponses

- `id` (Int, PK, Auto Increment)
- `name` (String, 필수)
- `contact` (String, 필수)
- `email` (String, 선택)
- `timeSlot` (Enum: TimeSlot)
- `message` (String, 선택)
- `createdAt` (DateTime, 자동 생성)
