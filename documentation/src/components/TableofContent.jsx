import React from "react";

function TableOfContents() {
  return (
    <div className="toc-container">
      <h3>
        <strong>📖 Table of contents</strong>
      </h3>
      <ul>
        <li>
          <a href="#intro-api">What is API documentation?</a>
        </li>
        <li>
          <a href="#srvstr-api">Start Connection</a>
        </li>
        <li>
          <a href="#con-api">Connection&Table Creation</a>
        </li>
        <li>
          <a href="#auth-api">Authentication Middleware</a>
        </li>
        <li>
          <a href="#register-api">User Registration</a>
        </li>
        <li>
          <a href="#checkuser-api">Check User</a>
        </li>
        <li>
          <a href="#login-api">User LogIn</a>
        </li>
        <li>
          <a href="#logout-api">User LogOut</a>
        </li>
        <li>
          <a href="#getanswer-api">Get Answer</a>
        </li>
        <li>
          <a href="#postanswer-api">post Answer</a>
        </li>
        <li>
          <a href="#deleteanswer-api">Delete Answer</a>
        </li>
        <li>
          <a href="#getallqu-api">Get All Questions</a>
        </li>
        <li>
          <a href="#singlqu-api">Single Question</a>
        </li>
        <li>
          <a href="#postqu-api">Post Question</a>
        </li>
        {/* <li>
          <a href="#about-api">Summer</a>
        </li> */}
      </ul>
    </div>
  );
}

export default TableOfContents;
