import React from "react";
import "./App.css";
import CourseList from "./CourseList";

function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  return (
    <div className="App">
      {!!loggedInUser ? (
        <div>Authenticated User Stuff Goes Here</div>
      ) : (
        <LoginForm />
      )}
      <CourseList />
      <h1>Course Sign Up</h1>
      <h2>Courses</h2>
      <h2>Sign Up</h2>

      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Email" />
      <button onClick={() => alert("Sign up clicked!")}>Sign Up</button>
    </div>
  );
}

export default App;
