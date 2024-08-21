# CipherSchools Project

This project is a full-stack application developed for CipherSchools. The backend is built with Node.js and Express, using MongoDB as the database. The frontend is built with React.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14 or later)
- npm (version 6 or later)
- MongoDB Atlas account (or a local MongoDB instance)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name

2. **Install frontend dependencies:**
    cd client
    npm install

3. **Create a .env file in the client directory:**
    VITE_API_URL="Your backend URL"

4. **Install backend dependencies:**
    cd ../server
    npm install

5. **Create a .env file in the server directory:**
    MONGODB_URI="Your MongoDB URI"
    PORT="Your port number"
    ACCESS_TOKEN_SECRET="Your unique access token"
    ACCESS_TOKEN_EXPIRY="Access token expiry time"
    REFRESH_TOKEN_SECRET="Your unique refresh token"
    REFRESH_TOKEN_EXPIRY="Refresh token expiry time"
    EMAIL="Your email"
    PASSWORD="Your email password (use an app-specific password if you have two-factor authentication enabled)"

**Start the development server:**
    npm start

**Start the development client:**
    npm run dev
Email After Test Submission
![Project Architecture](./server/public/image.png)

More details about the project...
