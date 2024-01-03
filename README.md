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

1. **Add the Mongodb URI and JWT secret**
- Add the Mongodb URI [here](https://github.com/the-cross-art/backend/blob/27c024f238228653cc9fef0e7f624b43db3fc0e1/config/config.env#L2)
    ```bash
    DB_URI=	mongodb://<<ADD YOUR URL>>/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+<<VERSION>>
    JWT_SECRET=qwertyuiopasdfghjklzxcvbnm
    ``` 

2. **Start the application:**

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

## User Authentication and Token Handling

### Login Process

1. **User Authentication:** When a user successfully logs in by providing their email and password, the server validates the credentials.

2. **Token Generation:** Upon successful authentication, the server generates a JSON Web Token (JWT) representing the user's identity and includes it in the login response.

3. **Token Storage:** The client (e.g., web browser or mobile app) securely stores the received JWT. In web applications, it's often stored in an HTTP cookie with `HttpOnly` and `Secure` attributes for enhanced security.

4. **Subsequent Requests:** For subsequent requests, the client includes the stored JWT in the request header.

### Token Verification

1. **Server Receives Request:** When the server receives a request, it checks for the presence of a JWT in the request header.

2. **Token Verification:** The server verifies the authenticity and validity of the received JWT. It checks the signature, expiration, and other relevant details to ensure the token is genuine and still valid.

3. **User Authentication:** If the token is valid, the server considers the user as authenticated and processes the request accordingly.

By following this authentication flow, we ensures secure and efficient user login, allowing authenticated users to interact seamlessly with the application. 🚀


## Example Requests


### Register a new user
#### Request
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
#### Response
```http
HTTP/1.1 201 Created
Content-Type: application/json
{
    "success": true,
    "user": {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "********",
        "role": "user",
        "_id": "6595cd4ae2b3a4d7592ac7bb",
        "createdAt": "2024-01-03T21:10:34.634Z",
        "__v": 0
    },
    "token": "*********90kpTM"
}
```

### Log in as an existing user

#### Request
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```
#### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json
{
    "success": true,
    "user": {
        "_id": "6595cd4ae2b3a4d7592ac7bb",
        "name": "John Doe",
        "email": "john@example.com",
        "password": "*******************",
        "role": "user",
        "createdAt": "2024-01-03T21:10:34.634Z",
        "__v": 0
    },
    "token": "*******************"
}
```
### Create a new note
#### Request

```http
POST /api/notes
Content-Type: application/json

{
  "notes": "Meeting Notes"
}
```
#### Response
```http
HTTP/1.1 201 Created
Content-Type: application/json
{
    "success": true,
    "note": {
        "notes": "Meeting Notes",
        "user": "6595cd4ae2b3a4d7592ac7bb",
        "_id": "6595cfa4e2b3a4d7592ac7c1",
        "createdAt": "2024-01-03T21:20:36.550Z",
        "__v": 0
    }
}
```

### List all note for authenticated user
#### Request

```http
GET /api/notes
```
#### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json
{
    "success": true,
    "allNotes": [
        {
            "_id": "6595cfa4e2b3a4d7592ac7c1",
            "notes": "Meeting Notes",
            "user": "6595cd4ae2b3a4d7592ac7bb",
            "createdAt": "2024-01-03T21:20:36.550Z",
            "__v": 0
        }
    ]
}
```

### List the note for authenticated user
#### Request

```http
GET /api/notes/:id
```
#### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json
{
    "success": true,
    "note": {
        "_id": "6595cfa4e2b3a4d7592ac7c1",
        "notes": "Meeting Notes",
        "user": "6595cd4ae2b3a4d7592ac7bb",
        "createdAt": "2024-01-03T21:20:36.550Z",
        "__v": 0
    }
}
```

### Update a note
#### Request

```http
PUT /api/notes/:id
Content-Type: application/json

{
  "notes": "Updated Note"
}
```
#### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json
{
    "success": true,
    "note": {
        "_id": "6595cfa4e2b3a4d7592ac7c1",
        "notes": "Updated Note",
        "user": "6595cd4ae2b3a4d7592ac7bb",
        "createdAt": "2024-01-03T21:20:36.550Z",
        "__v": 0
    }
}
```

### Delete the note for authenticated user
#### Request

```http
DELETE /api/notes/:id
```
#### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json
{
    "success": true,
    "message": "Note Deleted Successfully"
}
```


### Share a note with another user for the authenticated user.
```http
POST /api/notes/:id/share
Content-Type: application/json

{
  "email": "emailidgmail.com"
}
```
#### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json
{
    "success": true,
    "message": "Note shared successfully with emailid@gmail.com"
}
```

### Search for notes based on keywords for the authenticated user.
```http
GET /api/search?q=:query
Content-Type: application/json
EXAMPLE http://localhost:4000/api/search?q=Meeting
```
#### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json
{
    "success": true,
    "searchResults": [
        {
            "_id": "6595d160e2b3a4d7592ac7d0",
            "notes": "Meeting Notes",
            "user": "6595cd4ae2b3a4d7592ac7bb",
            "createdAt": "2024-01-03T21:28:00.188Z",
            "__v": 0
        }
    ]
}
```