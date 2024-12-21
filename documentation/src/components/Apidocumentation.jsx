import React, { useState } from "react";
import "./ApiDocumentation.css";
// import { Link } from 'react-router-dom'; // Make sure this import exists
import TableOfContents from "./TableofContent";

// what is **************************
const ApiDocintroducion = () => {
  return (
    <section className="api-section" id="intro-api">
      <h2>API Documentation</h2>

      <h3>Introduction</h3>
      <p>
        API documentation is a set of human-readable instructions for using and
        integrating with an API. It includes detailed information about an API's
        available endpoints, methods, resources, authentication protocols,
        parameters, and headers, as well as examples of common requests and
        responses. This page shows how to use the backend of the Green-Food
        website.
      </p>

      <h3>HTTP Request Methods</h3>
      <p>
        <>HTTP</> methods are used to indicate the action an API client would
        like to perform on a given resource. Each HTTP method maps to a specific
        operation, such as creating, reading, updating, or deleting a resource,
        and an HTTP method must be included with every request to a REST API.
      </p>
      <p>
        REST (Representational State Transfer) is the most commonly used
        architectural style for building web services and APIs, and it
        emphasizes standardized, stateless interactions between clients and
        servers. REST APIs are designed around resources, which are accessible
        via unique API endpoints.
      </p>

      <h3>Base URL</h3>
      <p>
        To use this API, send an HTTP request to the base URL:{" "}
        <code>https://localhost:3003</code> with the given endpoint.
      </p>
    </section>
  );
};

//db & server both are successfull
const StartConnectionDoc = () => {
  return (
    <section className="api-section" id="srvstr-api">
      <h2>Start Connection</h2>
      <p>
        <strong>File:</strong> <code>startConnection.js</code>
      </p>
      <p>
        <strong>Description:</strong> The <code>startConnection</code> function
        is responsible for establishing a database connection and starting the
        server. It first checks if the database is reachable by executing a test
        query and then starts the server on the specified port. If successful,
        it logs relevant success messages, and if any error occurs during the
        process, the error is caught and logged.
      </p>

      <h3>Function Signature:</h3>
      <pre>
        {`
const startConnection = async () => {
  try {
    const result = await dbPromise.execute("select 'test'");
    console.log(result);
    await app.listen(port);
    console.log("database connected");
    console.log(\`server running on http://localhost:\$(port)\`);
  } catch (error) {
    console.log(error.message);
  }
};
startConnection();
`}
        <br></br>
        const port = 3000; // Define the port here, or get it from environment:
        process.env.PORT || 3000
      </pre>

      <h3>Parameters:</h3>
      <p>This function does not take any parameters.</p>

      <h3>Return Value:</h3>
      <p>
        The function does not return any value. It logs the database connection
        status and server startup status to the console.
      </p>

      <h3>Response Behavior:</h3>
      <p>
        Upon successful database connection and server start, the following
        messages are logged:
      </p>
      <ul>
        <li>
          "database connected" - Indicates that the database connection was
          successful.
        </li>
        <li>
          `server running on http://localhost:port` - Logs the server's URL,
          including the specified port.
        </li>
      </ul>

      <h3>Example Usage:</h3>
      <pre>{`startConnection();`}</pre>
      <p>
        Calling the <code>startConnection()</code> function will attempt to
        connect to the database and start the server. It will log success or
        error messages to the console.
      </p>

      <h3>Potential Errors:</h3>
      <p>
        If there are issues during the database query or server startup, errors
        will be logged. Some potential errors include:
      </p>
      <ul>
        <li>Database connection failure</li>
        <li>Server startup failure (e.g., incorrect port)</li>
        <li>Issues with asynchronous operations or query execution</li>
      </ul>

      <h3>Error Handling:</h3>
      <p>
        If an error occurs, it is caught in the <code>catch</code> block, and
        the error message is logged to the console. Some examples of error
        responses:
      </p>

      <h4>Error Response Example:</h4>
      <p>
        <strong>Status Code:</strong> 500 Internal Server Error
      </p>
      <pre>{`{
  "success": false,
  "msg": "Something went wrong, try again later!"
}`}</pre>
      <p>
        This error typically occurs when there is a problem with the database
        connection or the server startup process.
      </p>

      <h3>Notes:</h3>
      <ul>
        <li>
          The function uses <code>dbPromise</code> to execute the database
          query, which is assumed to be a promise-based API for database
          operations.
        </li>
        <li>
          The server is started using <code>app.listen(port)</code>, where{" "}
          <code>port</code> is the port the server should run on.
        </li>
        <li>
          The test query <code>select 'test'</code> is used to ensure that the
          database connection is valid and the database is reachable.
        </li>
      </ul>
    </section>
  );
};
// db connection API document ********************************************
const DbConfigAPI = () => {
  return (
    <section className="api-section" id="con-api">
      <h2>Database Configuration and Table Creation</h2>
      {/* <p>
        <strong>File:</strong> <code>dbConfig.js</code>
      </p> */}
      <p>
        <strong>Description:</strong> This file handles the database connection
        setup and table creation for user-related data and question/answer
        functionalities. It uses the <code>mysql2</code> package to configure a
        connection pool for interacting with the MySQL database.
      </p>
      <h3>Database Connection:</h3>
      <p>
        The MySQL connection is configured using a connection pool to manage
        database connections efficiently. The connection details (username,
        password, host, and database name) are read from environment variables.
      </p>
      <pre>{`const dbConnection = mysql.createPool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10
});`}</pre>
      <p>
        <strong>The connection pool</strong> allows up to 10 concurrent
        connections to the database, providing scalability for database queries.
      </p>
      <p>
        <strong>A connection pool</strong> is a collection of reusable database
        connections that improves performance by reducing the overhead of
        opening and closing connections repeatedly. It allows multiple
        concurrent database queries, providing scalability and efficient
        resource management. By limiting the number of connections, it prevents
        database overload and ensures faster query execution.
      </p>
      <h3>SQL Table Creation:</h3>
      <p>
        This file also defines SQL queries for creating three main tables:{" "}
        <strong>users</strong>, <strong>questions</strong>, and{" "}
        <strong>answers</strong>, which are used to store user data, user
        questions, and user answers, respectively.
      </p>
      <h4>Users Table:</h4>
      <pre>{`CREATE TABLE if not exists users(
  userId INT(20) NOT NULL AUTO_INCREMENT,
  userName VARCHAR(20) NOT NULL,
  firstName VARCHAR(20) NOT NULL,
  lastName VARCHAR(20) NOT NULL,
  email VARCHAR(40) NOT NULL,
  password VARCHAR(100) NOT NULL,
  RegisteredTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  LastLogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(userId)
);`}</pre>
      <p>
        This table holds <strong>user</strong> details such as username, first
        name, last name, email, and password. It also tracks when a user
        registered and their last login time.
      </p>
      <h4>Questions Table:</h4>
      <pre>{`CREATE TABLE if not exists questions(
  id INT(20) NOT NULL AUTO_INCREMENT,
  questionId VARCHAR(100) NOT NULL UNIQUE,
  userId INT(20) NOT NULL,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(200) NOT NULL,
  tag VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id, questionId),
  FOREIGN KEY(userId) REFERENCES users(userId)
);`}</pre>
      <p>
        The <strong>questions</strong> table stores each user's questions,
        including a unique question ID, title, description, and tags. It also
        links each question to the user who created it using the{" "}
        <code>userId</code> foreign key.
      </p>
      <p>
        <h5>why we use both id and questionId in questions table schema.</h5>{" "}
        <code>id:</code> A numeric, auto-incrementing identifier used internally
        by the database for efficient storage and queries. <br></br>Example: 1,
        2, 3.{" "}
      </p>
      <p>
        <code>questionId:</code> Acts as an externally meaningful, unique
        identifier for each question. Likely used in URLs, API endpoints, or
        references where a non-numeric identifier is desirable. <br></br>{" "}
        Example: "Q-20240101", "Q-12345".
      </p>
      <h4>Answers Table:</h4>
      <pre>{`CREATE TABLE if not exists answers(
  answerId INT(20) NOT NULL AUTO_INCREMENT,
  userId INT(20) NOT NULL,
  questionId VARCHAR(100) NOT NULL,
  answer VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(answerId),
  FOREIGN KEY(questionId) REFERENCES questions(questionId),
  FOREIGN KEY(userId) REFERENCES users(userId)
);`}</pre>
      <p>
        The <strong>answers</strong> table stores answers provided by users to
        specific questions. It links answers to questions and users through the{" "}
        <code>questionId</code> and <code>userId</code> foreign keys.
      </p>
      <h3>Response Behavior:</h3>
      <p>
        Upon loading the application, the database connection pool is
        initialized, and SQL queries for creating tables are executed. If the
        tables don't already exist, they will be created automatically. If the
        table creation is successful, a console log message will indicate it.
      </p>
      <h3>Error Handling:</h3>
      <p>
        In case of errors during table creation or database interactions, the
        application will throw errors, and the relevant message will be logged
        to the console. We first ensure that the environment variables are
        correctly set up.
      </p>
      <h4>Error Response:</h4>
      <p>
        <strong>Status Code:</strong> 500 Internal Server Error
      </p>
      <pre>{`{
  "success": false,
  "msg": "Something went wrong, try again later!"
}`}</pre>
      <p>
        This error typically occurs when there is an issue with connecting to
        the database or executing a query. It can also happen if the required
        environment variables are missing or incorrect.
      </p>
    </section>
  );
};
// Authentication Middleware API Document **********************************
const AuthAPI = () => {
  return (
    <section className="api-section" id="auth-api">
      <h2>Authentication Middleware</h2>
      <p>
        <strong>Endpoint:</strong> <code>/api/user/checkUser</code>
      </p>
      <p>
        <strong>Method:</strong> GET
      </p>
      <p>
        <strong>Description:</strong> Checks the current authenticated user's
        information by verifying the JWT token provided in the Authorization
        header.
      </p>
      <p>
        <h5>The JWT is composed of three parts:</h5>
        <strong>Header:</strong> Metadata about the token.<br></br>
        <strong> Payload:</strong> User information and claims (e.g., userId,
        userName).<br></br>
        <strong>Signature:</strong> A cryptographic hash that ensures the
        token's integrity.
      </p>

      <h3>Request Headers:</h3>
      <pre>{`Authorization: Bearer <token>`}</pre>
      <p>
        The request must include an <code>Authorization</code> header with a
        valid Bearer token. The token is typically provided after the user
        successfully logs in and is used to authenticate subsequent requests.
      </p>

      <h3>Response:</h3>
      <h4>Successful Response:</h4>
      <p>
        <strong>Status Code:</strong> 200 OK
      </p>
      <p>
        <strong>Content-Type:</strong> application/json
      </p>
      <pre>
        {`{
  "msg": "valid user",
  "userName": "Kebede",
  "userId": "123"
}`}
      </pre>

      <p>
        <strong>Description:</strong> If the JWT token is valid, the user's
        information (e.g., username and user ID) will be returned.
      </p>

      <h4>Error Response:</h4>
      <p>Status Code: 401 Unauthorized</p>

      <pre>
        {`{
  "success": false,
  "msg": "Not Authorized Login again"
}`}
      </pre>
      <div>
        <p>
          <strong>Description:</strong> Authentication credentials are either
          missing or incorrect. This occurs when no token is provided, or the
          provided token is invalid or expired.
        </p>
      </div>

      <h4>Error Response:</h4>
      <p>Status Code: 500 Internal Server Error</p>

      <pre>
        {`{
  "success": false,
  "msg": "Something went wrong, try again later!"
}`}
      </pre>
      <p>
        <strong>Description:</strong> A server-side error occurred, usually if
        there is an issue processing the token or verifying it.
      </p>
      <div className="api-doc-section">
        <h3>Example Usage</h3>

        <div className="api-example">
          <per>
            GET: /api/user/checkUser <br />
            Authorization: Bearer &lt;your_jwt_token&gt;
          </per>
        </div>
      </div>
    </section>
  );
};
// Sign-up API Document **********************************************
const RegisterAPI = () => {
  return (
    <section className="api-section" id="register-api">
      <h2>User Registration API</h2>
      <p>
        <strong>Endpoint:</strong> <code>/api/user/register</code>
      </p>
      <p>
        <strong>Method:</strong> POST
      </p>
      <p>
        <strong>Description:</strong> Registers a new user with the provided
        username, first name, last name, email, and password. Password must be
        at least 8 characters long. If the username or email is already taken,
        registration will fail. The API also generates a JWT token upon
        successful registration.
      </p>

      <h3>Request Body:</h3>
      <p>The request body should contain the following fields:</p>
      <pre>
        {`{
  "userName": "string", // The username of the user (required)
  "firstName": "string", // The user's first name (required)
  "lastName": "string",  // The user's last name (required)
  "email": "string",     // The user's email address (required)
  "password": "string"   // The user's password (required)
}`}
      </pre>
      <p>
        <strong>Required Fields:</strong> `userName`, `firstName`, `lastName`,
        `email`, and `password` are mandatory for registration.
      </p>

      <h3>Response:</h3>
      <h4>Successful Response:</h4>
      <p>
        <strong>Status Code:</strong> 200 OK
      </p>
      <p>
        <strong>Content-Type:</strong> application/json
      </p>
      <pre>
        {`{
  "data": {
    "userId": "number", // Unique user ID
    "userName": "string", // User's username
    "firstName": "string", // User's first name
    "lastName": "string", // User's last name
    "email": "string" // User's email
  },
  "token": "string" // JWT token for user authentication
}`}
      </pre>
      <p>
        <strong>Description:</strong> If registration is successful, the API
        returns the user's data along with a JWT token for authentication.
      </p>

      <h4>Error Responses</h4>
      <div className="container">
        <div className="circle">1</div>
        <div className="error-text">
          <h5>Missing Required Fields</h5>
        </div>
      </div>
      <p>
        <strong>Status Code:</strong> 400 Bad Request
      </p>
      <pre>
        {`{
  "msg": "please provide all required fields!"
}`}
      </pre>
      <div className="container">
        <div className="circle">2</div>
        <div className="error-text">
          <h5>User Already Exists</h5>
        </div>
      </div>

      <p>
        <strong>Status Code:</strong> 400 Bad Request
      </p>
      <pre>
        {`{
  "msg": "user already existed"
}`}
      </pre>
      <div className="container">
        <div className="circle">3</div>
        <div className="error-text">
          <h5>Password Validation Failed</h5>
        </div>
      </div>

      <p>
        <strong>Status Code:</strong> 400 Bad Request
      </p>
      <pre>
        {`{
  "msg": "password must be at least 8 characters"
}`}
      </pre>
      <div className="container">
        <div className="circle">4</div>
        <div className="error-text">
          <h5>Invalid Email Format</h5>
        </div>
      </div>
      <p>
        <strong>Status Code:</strong> 400 Bad Request
      </p>
      <pre>
        {`{
  "success": false,
  "message": "Please enter a valid email"
}`}
      </pre>
      <div className="container">
        <div className="circle">5</div>
        <div className="error-text">
          <h5>Internal Server Error</h5>
        </div>
      </div>
      <p>
        <strong>Status Code:</strong> 500 Internal Server Error
      </p>
      <pre>
        {`{
  "msg": "something went wrong, try again later!"
}`}
      </pre>
      <p>
        <strong>Description:</strong> A server-side error occurred. This
        typically happens if there's an issue with database operations or other
        unexpected issues.
      </p>

      <div className="api-doc-section">
        <h3>Example Usage</h3>
        <div className="api-example">
          <per>
            POST /api/user/register <br />
            Content-Type: application/json <br />
            Body: <br />
            {`{
  "userName": "AbebeDoe",
  "firstName": "Abebe",
  "lastName": "Doe",
  "email": "Abebedoe@example.com",
  "password": "SecurePass123"
}`}
          </per>
        </div>
      </div>
    </section>
  );
};
// check user validation API document *********************************************
const CheckUserAPI = () => {
  return (
    <section className="api-section" id="checkuser-api">
      <h2>Check User API</h2>
      <p>
        <strong>Endpoint:</strong> <code>/api/user/check</code>
      </p>
      <p>
        <strong>Method:</strong> GET
      </p>
      <p>
        <strong>Description:</strong> Confirms if the user is valid by
        retrieving their username and user ID from the request. Returns a
        success message along with the user information.
      </p>

      <h3>Request:</h3>
      <p>The request must include the following:</p>
      <ul>
        <li>
          A valid authentication token in the headers, which provides the user's
          information.
        </li>
      </ul>

      <h3>Response:</h3>
      <h4>Successful Response:</h4>
      <p>
        <strong>Status Code:</strong> 200 OK
      </p>
      <p>
        <strong>Content-Type:</strong> application/json
      </p>
      <pre>
        {`{
  "msg": "valid user",
  "userName": "string",
  "userId": "string"
}`}
      </pre>
      <p>
        <strong>Description:</strong> Confirms the user is valid and includes
        the user's username and ID in the response.
      </p>
    </section>
  );
};
//login API Documntation section **************************************
const LoginAPI = () => {
  return (
    <section className="api-section" id="login-api">
      <h2>User Login API</h2>
      <p>
        <strong>Endpoint:</strong> <code>/api/user/login</code>
      </p>
      <p>
        <strong>Method:</strong> POST
      </p>
      <p>
        <strong>Description:</strong> Authenticates a user by verifying their
        email and password. If the credentials are valid, a JWT token is
        returned for subsequent authenticated requests.
      </p>

      <h3>Request Body:</h3>
      <p>The request body should contain the following fields:</p>
      <pre>
        {`{
  "email": "string",    // The user's email address (required)
  "password": "string"  // The user's password (required)
}`}
      </pre>
      <p>
        <strong>Required Fields:</strong> `email` and `password` are required
        for login.
      </p>

      <h3>Response:</h3>
      <h4>Successful Response:</h4>
      <p>
        <strong>Status Code:</strong> 200 OK
      </p>
      <p>
        <strong>Content-Type:</strong> application/json
      </p>
      <pre>
        {`{
  "msg": "user login successful",
  "token": "jwt_token_here",
  "userName": "string"
}`}
      </pre>
      <p>
        <strong>Description:</strong> If the credentials are correct, a JWT
        token is returned along with the user's username.
      </p>

      <h4>Error Responses:</h4>
      <div className="container">
        <div className="circle">1</div>
        <div className="error-text">
          <h5>Missing Required Fields</h5>
        </div>
      </div>

      <p>
        <strong>Status Code:</strong> 400 Bad Request
      </p>
      <pre>
        {`{
  "msg": "please enter all required fields!"
}`}
      </pre>
      <p>
        <strong>Description:</strong> Either the email or password is missing in
        the request body.
      </p>
      <div className="container">
        <div className="circle">2</div>
        <div className="error-text">
          <h5>Invalid Credentials</h5>
        </div>
      </div>

      <p>
        <strong>Status Code:</strong> 400 Bad Request
      </p>
      <pre>
        {`{
  "msg": "invalid credential!"
}`}
      </pre>
      <p>
        <strong>Description:</strong> The provided email doesn't exist, or the
        password is incorrect.
      </p>

      <div className="container">
        <div className="circle">3</div>
        <div className="error-text">
          <h5>Internal Server Error</h5>
        </div>
      </div>
      <p>
        <strong>Status Code:</strong> 500 Internal Server Error
      </p>
      <pre>
        {`{
  "msg": "something went wrong, try again later!"
}`}
      </pre>
      <p>
        <strong>Description:</strong> A server-side error occurred, usually
        caused by issues in processing the login or connecting to the database.
      </p>
    </section>
  );
};
// loug out API document ************************************************
const LogOutAPI = () => {
  return (
    <section className="api-section" id="logout-api">
      <h2>Log Out API</h2>
      <p>
        <strong>Endpoint:</strong> <code>/api/user/logout</code>
      </p>
      <p>
        <strong>Method:</strong> POST
      </p>
      <p>
        <strong>Description:</strong> Logs out the authenticated user and
        returns a confirmation message indicating the logout was successful.
      </p>

      <h3>Request:</h3>
      <p>
        This endpoint does not require a request body. Ensure the user is
        authenticated before calling this endpoint.
      </p>

      <h3>Response:</h3>
      <h4>Successful Response:</h4>
      <p>
        <strong>Status Code:</strong> 200 OK
      </p>
      <p>
        <strong>Content-Type:</strong> application/json
      </p>
      <pre>
        {`{
  "success": true,
  "msg": "successfuly logout"
}`}
      </pre>
      <p>
        <strong>Description:</strong> Indicates that the user has been
        successfully logged out.
      </p>
    </section>
  );
};
// Post Answer API Section *******************************************
const PostAnswerAPI = () => {
  return (
    <section className="api-section" id="postanswer-api">
      <h2>Post Answer API</h2>
      <p>
        <strong>Endpoint:</strong> <code>/api/answers</code>
      </p>
      <p>
        <strong>Method:</strong> POST
      </p>
      <p>
        <strong>Description:</strong> This API endpoint allows a user to post an
        answer to a specific question.
      </p>

      <h3>Request Body:</h3>
      <pre>{`{
  "questionId": "<Question ID>",
  "answer": "<User's Answer>"
}`}</pre>
      <p>
        - <code>questionId</code>: The ID of the question the answer is related
        to. - <code>answer</code>: The answer text that the user wants to post.
      </p>

      <h3>Response:</h3>
      <h4>Successful Response:</h4>
      <p>Status Code: 201 Created</p>
      <pre>{`{
  "msg": "Answer posted successfully"
}`}</pre>
      <p>
        <strong>Description:</strong> The answer has been successfully posted,
        and the response confirms it.
      </p>

      <h4>Error Response (Missing Answer):</h4>
      <p>Status Code: 400 Bad Request</p>
      <pre>{`{
  "msg": "please provide answer"
}`}</pre>
      <p>
        <strong>Description:</strong> If the answer is not provided in the
        request body, the server responds with a 400 error.
      </p>

      <h4>Error Response (Internal Server Error):</h4>
      <p>Status Code: 500 Internal Server Error</p>
      <pre>{`{
  "msg": "An unexpected error occurred."
}`}</pre>
      <p>
        <strong>Description:</strong> Occurs if there is an issue with the
        database query or server-side error.
      </p>

      <div className="api-doc-section">
        <h3>Example Usage</h3>
        <div className="api-example">
          <per>
            POST /api/answers <br />
            Request Body: <br />
            {`{
  "questionId": "1234abcd5678efgh",
  "answer": "This is my answer."
}`}
          </per>
        </div>
      </div>
    </section>
  );
};
// Get answer API DOcuments ****************************************
const GetAnswerAPI = () => {
  return (
    <section className="api-section" id="getanswer-api">
      <h2>Get Answer API</h2>
      <p>
        <strong>Endpoint:</strong>{" "}
        <code>/api/questions/:questionId/answers</code>
      </p>
      <p>
        <strong>Method:</strong> GET
      </p>
      <p>
        <strong>Description:</strong> This API endpoint retrieves all answers
        for a specific question by its <code>questionId</code>. It also returns
        user details such as username, first name, and last name for each
        answer.
      </p>

      <h3>Request Parameters:</h3>
      <p>
        <strong>Path Parameter:</strong>
      </p>
      <ul>
        <li>
          <code>questionId</code>: The ID of the question to fetch the answers
          for.
        </li>
      </ul>

      <h3>Response:</h3>
      <h4>Successful Response:</h4>
      <p>Status Code: 200 OK</p>
      <pre>{`{
  "success": true,
  "answers": [
    {
      "questionId": 1,
      "answerId": 1,
      "answer": "This is the answer.",
      "userId": 123,
      "userName": "john_doe",
      "firstName": "John",
      "lastName": "Doe",
      "created_at": "2024-12-17T12:00:00Z"
    }
  ]
}`}</pre>
      <p>
        <strong>Description:</strong> Returns a list of answers for the provided{" "}
        <code>questionId</code>, including user details for each answer.
      </p>

      <h4>Error Response (No Answers Found):</h4>
      <p>Status Code: 404 Not Found</p>
      <pre>{`{
  "success": false,
  "message": "No answers found for this question."
}`}</pre>
      <p>
        <strong>Description:</strong> If there are no answers found for the
        given question, the server responds with a 404 error.
      </p>

      <h4>Error Response (Internal Server Error):</h4>
      <p>Status Code: 500 Internal Server Error</p>
      <pre>{`{
  "success": false,
  "message": "Something went wrong, try again later!"
}`}</pre>
      <p>
        <strong>Description:</strong> Occurs if there is an issue with the
        server while fetching answers.
      </p>

      <div className="api-doc-section">
        <h3>Example Usage</h3>
        <div className="api-example">
          <per>
            GET /api/questions/1/answers <br />
            <strong>Response:</strong> <br />
            {`{
  "success": true,
  "answers": [
    {
      "questionId": 1,
      "answerId": 1,
      "answer": "This is the answer.",
      "userId": 123,
      "userName": "john_doe",
      "firstName": "John",
      "lastName": "Doe",
      "created_at": "2024-12-17T12:00:00Z"
    }
  ]
}`}
          </per>
        </div>
      </div>
    </section>
  );
};
// how to delete the answer if needed API Documnet ***********************
const DeleteAnswerAPI = () => {
  return (
    <section className="api-section" id="deleteanswer-api">
      <h2>Delete Answer by User API</h2>
      <p>
        <strong>Endpoint:</strong> <code>/api/answer/:userId</code>
      </p>
      <p>
        <strong>Method:</strong> DELETE
      </p>
      <p>
        <strong>Description:</strong> This API allows users to delete their own
        answers. To maintain data privacy and security, only the owner of the
        answers (identified by their <code>userId</code>) is authorized to
        delete them. Attempts to delete answers owned by another user will be
        denied.
      </p>

      <h3>Request Parameters:</h3>
      <p>The endpoint requires the following parameter:</p>
      <pre>
        {`{
  "userId": "string" // The unique identifier of the user making the request (required)
}`}
      </pre>
      <p>
        <strong>Required Parameter:</strong> <code>userId</code> must match the
        identity of the authenticated user for this operation to proceed.
      </p>

      <h3>Response:</h3>
      <h4>Successful Response:</h4>
      <p>
        <strong>Status Code:</strong> 200 OK
      </p>
      <p>
        <strong>Content-Type:</strong> application/json
      </p>
      <pre>
        {`{
  "success": true,
  "message": "Answer removed successfully"
}`}
      </pre>
      <p>
        <strong>Description:</strong> The user's answers were successfully
        deleted.
      </p>

      <h4>Error Responses:</h4>
      <div className="container">
        <div className="circle">1</div>
        <div className="error-text">
          <h5>Unauthorized Action</h5>
        </div>
      </div>
      <p>
        <strong>Status Code:</strong> 403 Forbidden
      </p>
      <pre>
        {`{
  "success": false,
  "message": "You are not authorized to delete this answer"
}`}
      </pre>
      <p>
        <strong>Description:</strong> This response occurs when a user attempts
        to delete answers that do not belong to them. Ownership is strictly
        enforced to protect user data.
      </p>

      <div className="container">
        <div className="circle">2</div>
        <div className="error-text">
          <h5>Answer Not Found</h5>
        </div>
      </div>
      <p>
        <strong>Status Code:</strong> 404 Not Found
      </p>
      <pre>
        {`{
  "success": false,
  "message": "Answer not found"
}`}
      </pre>
      <p>
        <strong>Description:</strong> No answers were found for the provided
        user ID. This could indicate that the user has no existing answers or
        that the ID was invalid.
      </p>

      <div className="container">
        <div className="circle">3</div>
        <div className="error-text">
          <h5>Internal Server Error</h5>
        </div>
      </div>
      <p>
        <strong>Status Code:</strong> 500 Internal Server Error
      </p>
      <pre>
        {`{
  "success": false,
  "message": "Something went wrong, try again later!"
}`}
      </pre>
      <p>
        <strong>Description:</strong> A server-side error occurred, preventing
        the request from being processed. This may be due to issues with the
        database or backend logic.
      </p>
    </section>
  );
};
// Get AllQuestion API DOcumente *****************************
const GetAllQuestionsAPI = () => {
  return (
    <section className="api-section" id="getallqu-api">
      <h2>Get All Questions API</h2>
      <p>
        <strong>Endpoint:</strong> <code>/api/question</code>
      </p>
      <p>
        <strong>Method:</strong> GET
      </p>
      <p>
        <strong>Description:</strong> This API endpoint retrieves all questions
        from the database.
      </p>

      <h3>Response:</h3>
      <h4>Successful Response:</h4>
      <p>Status Code: 200 OK</p>
      <pre>{`{
  "success": true,
  "count": <Number of Questions>,
  "data": [
    {
      "userId": <userId>,
      "questionId": "<uniqueQuestionId>",
      "title": "<Question Title>",
      "description": "<Question Description>",
      "tag": "<Question Tag>",
      "created_at": "<Timestamp>"
    },
    ...
  ]
}`}</pre>
      <p>
        <strong>Description:</strong> Returns a list of all questions in the
        database, along with the total count.
      </p>

      <h4>Error Response:</h4>
      <p>Status Code: 500 Internal Server Error</p>
      <pre>{`{
  "success": false,
  "message": "Internal Server Error"
}`}</pre>
      <p>
        <strong>Description:</strong> Occurs if there is an issue with the
        database query or server-side error.
      </p>
    </section>
  );
};
// Get SingleQuestion API Document ***************************
const GetSingleQuestionAPI = () => {
  return (
    <section className="api-section" id="singlqu-api">
      <h2>Get Single Question API</h2>
      <p>
        <strong>Endpoint:</strong> <code>/api/questions/:questionId</code>
      </p>
      <p>
        <strong>Method:</strong> GET
      </p>
      <p>
        <strong>Description:</strong> This API endpoint handles a request to get
        the details of a single question from a database, based on a questionId
        passed as a route parameter.
        <code>questionId</code>.
      </p>

      <h3>Request Parameters:</h3>
      <p>The request must include the following URL parameter:</p>
      <pre>{`{
  "questionId": "<Unique Question ID>"
}`}</pre>
      <p>
        - <code>questionId</code>: The unique identifier of the question. It is
        a required parameter in the URL.
      </p>

      <h3>Response:</h3>
      <h4>Successful Response:</h4>
      <p>Status Code: 200 OK</p>
      <p>Content-Type: application/json</p>
      <pre>{`{
  "question": {
    "userId": <userId>,
    "questionId": "<uniqueQuestionId>",
    "title": "<Question Title>",
    "description": "<Question Description>",
    "tag": "<Question Tag>",
    "created_at": "<Timestamp>"
  }
}`}</pre>
      <p>
        <strong>Description:</strong> If the question is found, the server
        returns the question details including the
        <code>userId</code>, <code>questionId</code>, <code>title</code>,{" "}
        <code>description</code>, <code>tag</code>, and the
        <code>created_at</code> timestamp.
      </p>

      <h4>Error Response (Invalid Question ID):</h4>
      <p>Status Code: 400 Bad Request</p>
      <pre>{`{
  "msg": "Invalid question ID"
}`}</pre>
      <p>
        <strong>Description:</strong> This error occurs when the{" "}
        <code>questionId</code> parameter is missing or invalid.
      </p>

      <h4>Error Response (Question Not Found):</h4>
      <p>Status Code: 404 Not Found</p>
      <pre>{`{
  "msg": "Question not found"
}`}</pre>
      <p>
        <strong>Description:</strong> This error occurs if the question with the
        provided <code>questionId</code> does not exist in the database.
      </p>

      <h4>Error Response (Internal Server Error):</h4>
      <p>Status Code: 500 Internal Server Error</p>
      <pre>{`{
  "msg": "An unexpected error occurred"
}`}</pre>
      <p>
        <strong>Description:</strong> This error occurs when an unexpected error
        occurs on the server, such as a database connection issue or query
        failure.
      </p>

      <div className="api-doc-section">
        <h3>Example Usage</h3>
        <div className="api-example">
          <code>
            GET /api/questions/<strong>{`<questionId>`}</strong> <br />
            Example: GET /api/questions/1234abcd5678efgh
          </code>
        </div>
      </div>

      <h3>Function Overview:</h3>
      <p>
        The <strong>getSingleQuestion</strong> function retrieves the details of
        a specific question based on the provided <code>questionId</code>. It
        follows these steps:
      </p>
      <ul>
        <li>
          <strong>Validates input:</strong> It checks whether the{" "}
          <code>questionId</code> is provided in the URL parameters. If not, it
          returns a 400 error.
        </li>
        <li>
          <strong>Queries the database:</strong> It queries the{" "}
          <code>questions</code> table to find the question with the specified{" "}
          <code>questionId</code>.
        </li>
        <li>
          <strong>Handles not found error:</strong> If no question is found, it
          returns a 404 error with a "Question not found" message.
        </li>
        <li>
          <strong>Responds with question details:</strong> If the question is
          found, it returns the question's details (e.g., title, description,
          tag, created timestamp) in a JSON response.
        </li>
        <li>
          <strong>Handles unexpected errors:</strong> If any error occurs during
          the query execution, a 500 error is returned with a generic error
          message.
        </li>
      </ul>

      {/* <h3>Function Code:</h3>
      <pre>{`async function getSingleQuestion(req, res) {
  const { questionId } = req.params;
  console.log(questionId);

  // Check for missing questionId
  if (!questionId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid question ID" });
  }

  try {
    // Query the database to get the question details
    const [question] = await dbConnection.query(
      "SELECT * FROM questions WHERE questionId = ?",
      [questionId]
    );

    // If no question found, return 404
    if (question.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found" });
    }

    // Return the question details
    return res.status(StatusCodes.OK).json({ question: question[0] });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred" });
  }
}`}</pre> */}
    </section>
  );
};
// post Question API DOcument **************************************
const PostQuestionAPI = () => {
  return (
    <section className="api-section" id="postqu-api">
      <h2>Post Question API</h2>
      <p>
        <strong>Endpoint:</strong> <code>/api/questions</code>
      </p>
      <p>
        <strong>Method:</strong> POST
      </p>
      <p>
        <strong>Description:</strong> This API endpoint allows users to post a
        question. The title and description are required, and a unique question
        ID is automatically generated. A tag is also assigned to the question
        based on its title.
      </p>

      <h3>Request Body:</h3>
      <p>The request must include a JSON body with the following fields:</p>
      <pre>{`{
  "title": "<Question Title>",
  "description": "<Question Description>"
}`}</pre>
      <p>
        - <code>title</code>: The title of the question. Must be a non-empty
        string. - <code>description</code>: A detailed description of the
        question. Must be a non-empty string.
      </p>

      <h3>Response:</h3>
      <h4>Successful Response:</h4>
      <p>Status Code: 201 Created</p>
      <p>Content-Type: application/json</p>
      <pre>{`{
  "msg": "Question created successfully"
}`}</pre>
      <p>
        <strong>Description:</strong> If the question is successfully created,
        the server responds with a success message.
      </p>

      <h4>Error Response (Missing Required Fields):</h4>
      <p>Status Code: 400 Bad Request</p>
      <pre>{`{
  "error": "Please provide all required fields!"
}`}</pre>
      <p>
        <strong>Description:</strong> This error occurs if either the title or
        description is missing from the request body.
      </p>

      <h4>Error Response (Internal Server Error):</h4>
      <p>Status Code: 500 Internal Server Error</p>
      <pre>{`{
  "error": "An unexpected error occurred."
}`}</pre>
      <p>
        <strong>Description:</strong> This error occurs when there is an issue
        with the database or server while processing the request.
      </p>

      <div className="api-doc-section">
        <h3>Example Usage</h3>
        <div className="api-example">
          <per>
            POST /api/questions <br />
            Content-Type: application/json <br />
            Body: <br />
            {`{
  "title": "How do I use async/await in JavaScript?",
  "description": "I want to learn how async/await works in JavaScript."
}`}
          </per>
        </div>
      </div>

      <h3>Function Overview:</h3>
      <p>
        The <strong>postQuestion</strong> function handles the logic for
        creating a new question. It performs the following steps:
      </p>
      <ul>
        <li>
          <strong>Validates input:</strong> It checks if both title and
          description are provided in the request body. If any of these fields
          is missing, it returns a 400 error with a relevant message.
        </li>
        <li>
          <strong>Generates a unique question ID:</strong> It uses the built-in{" "}
          <code>crypto</code> module to generate a random unique ID for the
          question.
        </li>
        <li>
          <strong>Generates a tag:</strong> It generates a tag based on the
          question title using a keyword extraction function. If no relevant
          keywords are found, the default tag "general" is used.
        </li>
        <li>
          <strong>Inserts data into the database:</strong> It inserts the
          question into the <code>questions</code> table with the user ID,
          question ID, title, description, generated tag, and the current
          timestamp.
        </li>
        <li>
          <strong>Responds with success:</strong> If the insertion is
          successful, it returns a 201 status code with a success message.
        </li>
      </ul>
    </section>
  );
};
//summery*******************************

// Main ApiDocumentation Component

const Apidocumentation = () => {
  return (
    <>
      <div className="container container--flex container--flex--wrap">
        <h1>Evangadi Forum API Documentation</h1>
      </div>
      <div className="documentation-container">
        <div className="documentation-content-wrapper">
          {/* Left Sidebar Table of Contents */}
          <div className="toc-sidebar">
            <TableOfContents /> {/* TOC Sidebar on the left */}
          </div>

          {/* Right Content Area API Documentation */}
          <div className="api-content">
            <h2>Welcome to the API documentation</h2>
            <p>Below are the details of the available endpoints:</p>
            <hr />
            {/* These sections will be linked from the TOC */}
            <ApiDocintroducion />
            <StartConnectionDoc />
            <DbConfigAPI />
            <AuthAPI />
            <RegisterAPI />
            <CheckUserAPI />
            <LoginAPI />
            <LogOutAPI />
            <GetAnswerAPI />
            <PostAnswerAPI />
            <DeleteAnswerAPI />
            <GetAllQuestionsAPI />
            <GetSingleQuestionAPI />
            <PostQuestionAPI />
            {/* <ApiDocsummery/> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Apidocumentation;
