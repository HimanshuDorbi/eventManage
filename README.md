# Event Management Application

A comprehensive event management system built with modern tech stack. This full-stack application allows users to create, manage, and organize events efficiently.

![Screenshot 2025-02-09 204411](https://github.com/user-attachments/assets/5ce10f78-ee5c-45e4-8f10-8f160ca8ba33)

![Screenshot 2025-02-09 204445](https://github.com/user-attachments/assets/922f752f-02b0-4778-8fbe-56e9c4427efd)

## Features
- User Authentication and Authorization
- Event Creation and Event Management
- Event Categories
- Search and Filter Events
- Event Registeration and Unregisteration
- User Profile Management
- User Dashboard
- Responsive Design

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB installed locally or MongoDB Atlas account
- Git

### Clone the Repository
```bash
git clone https://github.com/HimanshuDorbi/eventManage.git
cd event-management-project
```

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGO_URI = mongodb://localhost:27017/<your db name>
JWT_SECRET = secret_key
PORT = 8085
EMAIL_USERNAME = your email_id
EMAIL_PASSWORD = your_password
```

4. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL = http://localhost:3000
```

4. Start the frontend development server:
```bash
npm start
```

## Project Folder Structure
```
.
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── styles/
│   └── package.json
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── middleware/
    └── package.json
```

## Available Scripts

In both frontend and backend directories, you can run:

### `npm start` and `npm run dev` respectively
Runs the app in development mode
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8085](http://localhost:8085)

### `npm test`
Launches the test runner

### `npm run build`
Builds the app for production


## for any query please mail to : codeewithdorbi@gmail.com

