## Backend API Documentation

### Authentication Endpoints

#### 1. Signup

- **URL:** `/api/auth/signup`
- **Method:** `POST`
- **Description:** Registers a new user with the provided credentials.
- **Request Body:**
  - `name`: User's name (string, minimum 3 characters)
  - `username`: User's username (string, alphanumeric, 3-16 characters)
  - `password`: User's password (string, 8-16 characters, containing at least one special character, one number, and one uppercase letter)
- **Response:**
  - `status_code`: HTTP status code
  - `status`: 1 for success, 0 for failure
  - `message`: Response message
  - `data`: User data (if successful)
  - `error`: Error message (if any)

#### 2. Login

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Logs in an existing user with the provided credentials.
- **Request Body:**
  - `username`: User's username
  - `password`: User's password
- **Response:**
  - `status_code`: HTTP status code
  - `status`: 1 for success, 0 for failure
  - `message`: Response message
  - `data`: User data and access token (if successful)
  - `error`: Error message (if any)

#### 3. Logout

- **URL:** `/api/auth/logout`
- **Method:** `POST`
- **Description:** Logs out the currently authenticated user.
- **Headers:**
  - `Authorization`: Access token
- **Response:**
  - `status_code`: HTTP status code
  - `status`: 1 for success, 0 for failure
  - `message`: Response message
  - `data`: Empty object
  - `error`: Error message (if any)

### Task Endpoints

#### 1. Create Task

- **URL:** `/api/tasks/create`
- **Method:** `POST`
- **Description:** Creates a new task for the authenticated user.
- **Headers:**
  - `Authorization`: Access token
- **Request Body:**
  - `title`: Task title
  - `description`: Task description
  - `due_date`: Due date of the task
- **Response:**
  - `status_code`: HTTP status code
  - `status`: 1 for success, 0 for failure
  - `message`: Response message
  - `data`: Created task object (if successful)
  - `error`: Error message (if any)

#### 2. Get Tasks

- **URL:** `/api/tasks/all-tasks`
- **Method:** `GET`
- **Description:** Retrieves all tasks associated with the authenticated user.
- **Headers:**
  - `Authorization`: Access token
- **Response:**
  - `status_code`: HTTP status code
  - `status`: 1 for success, 0 for failure
  - `message`: Response message
  - `data`: Array of task objects (if successful)
  - `error`: Error message (if any)

#### 3. Update Task

- **URL:** `/api/tasks/:taskId`
- **Method:** `PATCH`
- **Description:** Updates an existing task with the specified ID.
- **Headers:**
  - `Authorization`: Access token
- **Request Parameters:**
  - `taskId`: ID of the task to update
- **Request Body:** (at least one field required)
  - `title`: Updated task title
  - `description`: Updated task description
  - `due_date`: Updated due date of the task
  - `completed`: Boolean indicating task completion status
- **Response:**
  - `status_code`: HTTP status code
  - `status`: 1 for success, 0 for failure
  - `message`: Response message
  - `data`: Updated task object (if successful)
  - `error`: Error message (if any)

#### 4. Delete Task

- **URL:** `/api/tasks/:taskId`
- **Method:** `DELETE`
- **Description:** Deletes the task with the specified ID.
- **Headers:**
  - `Authorization`: Access token
- **Request Parameters:**
  - `taskId`: ID of the task to delete
- **Response:**
  - `status_code`: HTTP status code
  - `status`: 1 for success, 0 for failure
  - `message`: Response message
  - `data`: Deleted task object (if successful)
  - `error`: Error message (if any)

## Backend Setup

1. **Clone the Repository:**

   ```
   git clone https://github.com/aamirfarookh/Task-Managent-App.git
   ```

2. **Install Dependencies:**

   ```
   cd Backend
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:

   ```
   JWT_ACCESS_TOKEN_SECRET
   PORT=4500
   MONGODB_URI
   REDIS_HOST
   REDIS_PASSWORD
   REDIS_PORT
   ```

4. **Run the Server:**

   ```
   npm run server
   ```

   The server will start running on the specified port.

