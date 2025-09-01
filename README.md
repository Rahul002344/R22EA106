# CarePay — Patient Procedure Financing Demo (Affordmed-ready)

A minimal, original full‑stack web app that demonstrates REST APIs, React frontend, clean structure, and domain logic around **medical procedure cost estimates & EMI plans**.

- **Server:** Node.js + Express + Mongoose (MongoDB)
- **Client:** React + Vite + TypeScript
- **Auth:** JWT (register/login)
- **Domain logic:** EMI schedule & monthly installment calculation
- **CI-ready:** ESLint/Prettier (optional), Jest test stubs
- **Run options:** Local (Node), or **Docker Compose** (Mongo + API + Web)
- **Plagiarism:** Written from scratch for this submission

> Tailored for Affordmed’s evaluation focusing on REST APIs, DSA/OOP, and GitHub submission.


## 1) Prerequisites

Choose **either** Local or Docker:

### Local (Windows/macOS/Linux)
- Node.js 18+ and npm
- MongoDB 6+ running locally (`mongodb://localhost:27017`)
- Git

### Docker (recommended)
- Docker Desktop or Docker Engine + Compose plugin

---

## 2) Quick Start (Docker)

```bash
# in project root
docker compose up --build
```
- API: http://localhost:5000/api/health
- Web: http://localhost:5173

Seed procedures (DEV only): `GET http://localhost:5000/api/procedures/seed`

Stop: `Ctrl+C` then `docker compose down`


## 3) Quick Start (Local Node)

### Server
```bash
cd server
cp .env.example .env   # edit if needed
npm install
npm run dev            # starts on http://localhost:5000
```

### Client
```bash
cd client
cp .env.example .env   # set VITE_API_URL if not using default proxy
npm install
npm run dev            # starts on http://localhost:5173
```

Open http://localhost:5173


## 4) API Overview

Base URL: `http://localhost:5000/api`

- `POST /auth/register` — { name, email, password }
- `POST /auth/login` — { email, password } → { token }
- `GET /procedures` — list available procedures
- `GET /procedures/seed` — dev-only seeding
- `POST /quotes` (auth) — create EMI quote: { procedureId, amount, tenureMonths, interestRate }
- `GET /quotes` (auth) — list my quotes
- `GET /quotes/:id` (auth) — one quote

### EMI Formula (reducing balance)
Monthly rate r = (interestRate / 12) / 100.  
EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1)


## 5) Using the Web App

1) Register, then login  
2) Use **Create Quote** form → choose procedure, enter cost, tenure, interest  
3) See computed EMI & schedule, save the quote  
4) Review previous quotes in the list


## 6) Run tests (server)

```bash
cd server
npm test
```

> Test stubs are included; extend them as needed.


## 7) Postman

Import `postman/Affordmed_CarePay.postman_collection.json` and use the requests.


## 8) GitHub Submission (Command Prompt)

> Replace `ROLLNUMBER` with your actual roll number (repository name requirement).

```bash
cd path\to\affordmed-carepay
git init
git branch -M main
git add .
git commit -m "Affordmed submission: CarePay v1"
git remote add origin https://github.com/<your-username>/ROLLNUMBER.git
git push -u origin main
```

If the repo doesn’t exist yet, create a **public** repo named **ROLLNUMBER** on GitHub first, then run the above.

**Important:** One repo, one branch, separate folders per question if needed. Add `node_modules`, `.DS_Store`, etc. to `.gitignore` (already done here).


## 9) Notes for Evaluators

- Clean separation (routes/controllers/models), input validation, auth middleware
- Deterministic EMI logic in `server/src/utils/emi.js`
- Readable React components with TypeScript
- Minimal dependencies and zero boilerplate generators; fully hand-written


## 10) License

MIT — free to use for your assessment.
