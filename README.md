## Tech Stack
![Node.js Logo](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express Logo](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB Logo](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- **Node.js**: A JavaScript runtime for server-side development. 
- **Express**: A web application framework for Node.js. 
- **MongoDB**: A NoSQL database for efficient data storage. 
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Express Rate Limit**: Middleware to control and limit the rate of requests to the API.

# Installation and Running Instructions 🚀

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/the-cross-art/backend
    ```

2. **Navigate to the project directory:**

    ```bash
    cd backend
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

## Running the Application

1. **Start the application:**

    ```bash
    npm start
    ```


## Folder Structure

```
📦backend_push
 ┣ 📂config
 ┃ ┣ 📜config.env
 ┃ ┗ 📜database.js
 ┣ 📂controllers
 ┃ ┣ 📜noteController.js
 ┃ ┗ 📜userController.js
 ┣ 📂middleware
 ┃ ┣ 📜auth.js
 ┃ ┣ 📜catchAsyncErrors.js
 ┃ ┗ 📜error.js
 ┣ 📂models
 ┃ ┣ 📜noteModel.js
 ┃ ┗ 📜userModel.js
 ┃ ┗ 📜.package-lock.json
 ┣ 📂routes
 ┃ ┣ 📜noteRoute.js
 ┃ ┗ 📜userRoute.js
 ┣ 📂utils
 ┃ ┣ 📜errorhander.js
 ┃ ┗ 📜jwtToken.js
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜server.js
```

## Routes Overview

### `noteRoute`

#### Endpoints

1. **GET /notes**
   - Description: Get all notes for the authenticated user.
   - Middleware: `isAuthenticatedUser`
   - Controller: `getAllNotes`

2. **POST /notes**
   - Description: Create a new note for the authenticated user.
   - Middleware: `isAuthenticatedUser`
   - Controller: `createNote`

3. **GET /notes/:id**
   - Description: Get details of a specific note for the authenticated user.
   - Middleware: `isAuthenticatedUser`
   - Controller: `getNoteDetails`

4. **PUT /notes/:id**
   - Description: Update a specific note for the authenticated user.
   - Middleware: `isAuthenticatedUser`
   - Controller: `updateNote`

5. **DELETE /notes/:id**
   - Description: Delete a specific note for the authenticated user.
   - Middleware: `isAuthenticatedUser`
   - Controller: `deleteNote`

6. **POST /notes/:id/share**
   - Description: Share a specific note with other users.
   - Middleware: `isAuthenticatedUser`
   - Controller: `shareNote`

7. **GET /search**
   - Description: Search notes for the authenticated user.
   - Middleware: `isAuthenticatedUser`
   - Controller: `searchNotes`

### `userRoute`

#### Endpoints

1. **POST /auth/signup**
   - Description: Register a new user.
   - Controller: `registerUser`

2. **POST /auth/login**
   - Description: Log in an existing user.
   - Controller: `loginUser`

#### Middleware

- `isAuthenticatedUser`: Validates the user's authentication status.
- `authorizeRoles`: Authorizes user roles (not utilized in the provided routes).

## Usage

1. **Note Routes**
   - Use the `/notes` endpoint to manage notes.
   - Use the `/notes/:id/share` endpoint to share a note.
   - Use the `/search` endpoint to search for notes.

2. **User Routes**
   - Use the `/auth/signup` endpoint to register a new user.
   - Use the `/auth/login` endpoint to log in as an existing user.

## Example Requests

### Create a new note

```http
POST /notes
Content-Type: application/json

{
  "title": "Meeting Notes",
  "content": "Discuss project timelines and goals."
}
```

### Share a note
```http
POST /notes/123/share
Content-Type: application/json

{
  "email": "emailid"
}
```

### Register a new user
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Log in as an existing user
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```
