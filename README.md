# Assignment-7 - Social Media API

A RESTful API built with Node.js, Express, and Sequelize for managing users, posts, and comments in a social media application.

## 📚 API Documentation

Complete API documentation is available at:
**[API Documentation](https://degdfzhoc1.apidog.io/update-comment-27556852e0)**

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Assignment-7
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Create a `.env.secrets` file in `src/Config/` directory
   - Add your database credentials and configuration

4. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **Sequelize** - ORM for MySQL
- **MySQL2** - Database driver
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Assignment-7/
├── src/
│   ├── Config/          # Configuration files
│   ├── DB/              # Database models and connection
│   └── modules/         # Feature modules
│       ├── comments/    # Comment routes and services
│       ├── posts/       # Post routes and services
│       └── users/       # User routes and services
├── app.js               # Application entry point
└── package.json
```

## 🔌 API Endpoints

### Posts

- `POST /posts` - Create a new post
- `GET /posts/comment-count` - Get posts with comment counts
- `GET /posts/details` - Get all posts with details
- `DELETE /posts/:postId` - Delete a post

### Comments

- `POST /comments` - Create multiple comments (bulk)
- `POST /comments/find-or-create` - Find or create a comment
- `GET /comments/:commentId` - Get comment details
- `GET /comments/newest/:postId` - Get newest 3 comments for a post
- `GET /comments/search?word=<searchTerm>` - Search comments by word
- `PATCH /comments/:commentId` - Update a comment

## 🔍 Features

- **Bulk Comment Creation** - Create multiple comments in a single request
- **Advanced Search** - Search comments by content with pattern matching
- **Comment Tracking** - Get newest comments per post
- **Find or Create** - Avoid duplicate comments with find-or-create functionality
- **Validation** - Comprehensive input validation for all endpoints
- **Error Handling** - Consistent error responses across all endpoints

## 📝 License

ISC

## 👨‍💻 Author

Mohamed Samy | Route NodeJs Course - Assignment 7
