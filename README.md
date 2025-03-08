# Brainly

Brainly is a modern web application that helps you organize, manage, and share your favorite online content from platforms like YouTube and Twitter. Built with TypeScript, React, Node.js, and Express, Brainly offers a seamless experience for content curation and sharing.

## Features

- **Content Organization**: Save links from YouTube videos and Twitter posts with custom titles and tags
- **Content Management**: Add, view, edit, and delete your saved content
- **Smart Tagging**: Categorize your content with customizable tags for easy filtering
- **Brain Sharing**: Generate shareable links to let others view your curated collection
- **Responsive Design**: Clean, modern interface that works across devices
- **User Authentication**: Secure login and registration system

## Tech Stack

- **Frontend**:
  - React.js
  - TypeScript
  - Tailwind CSS for styling
  - React Router for navigation
  - Axios for API requests

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB for database
  - JWT for authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/brainly.git
   cd brainly
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../secondbrain
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the backend directory
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # In a new terminal, start frontend server
   cd secondbrain
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

### Sign Up / Login

1. Create a new account or log in with your existing credentials
2. Upon successful authentication, you'll be redirected to your dashboard

### Adding Content

1. Click the "Add Content" button on your dashboard
2. Enter the link URL (YouTube or Twitter)
3. Add a custom title for easy reference
4. Apply relevant tags to categorize your content
5. Save to add it to your collection

### Managing Content

- View all your saved content on the dashboard
- Filter content by tags to find specific items
- Delete any content you no longer need

### Sharing Your Brain

1. Click the "Share Brain" button on your dashboard
2. Copy the generated link
3. Share with friends, colleagues, or on social media
4. Recipients can view your curated content collection without needing an account

## API Endpoints

The backend provides the following main endpoints:

- **Authentication**:
  - `POST /api/auth/signup` - Register a new user
  - `POST /api/auth/login` - Authenticate a user

- **Content Management**:
  - `GET /api/content` - Get all content for authenticated user
  - `POST /api/content` - Create new content
  - `DELETE /api/content/:id` - Delete specific content
  - `PUT /api/content/:id` - Update specific content

- **Brain Sharing**:
  - `GET /api/brain/:hash` - Get shared content by hash
  - `POST /api/share` - Generate new shareable link

## Project Structure

```
brainly/
├── secondbrain/            # Frontend React application
│   ├── public/             # Public assets
│   ├── src/                # Source files
│   │   ├── components/     # Reusable components
│   │   ├── config/         # Configuration files
│   │   ├── hooks/          # Custom React hooks
│   │   ├── icons/          # SVG icons
│   │   ├── pages/          # Page components
│   │   ├── App.tsx         # Main app component
│   │   └── index.tsx       # Entry point
│   └── package.json        # Frontend dependencies
│
├── backend/                # Backend Node.js/Express application
│   ├── db.ts               # Database connection
│   ├── index.ts            # Main entry point
│   ├── middleware.ts       # Custom middleware
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   └── package.json        # Backend dependencies
│
└── README.md               # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
