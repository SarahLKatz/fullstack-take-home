import React from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import CourseList from "./CourseList";
import CourseInfo from "./CourseInfo";
import LoginForm from "./LoginForm";
import BasePage from "./BasePage";
import SectionPage from "./SectionPage";
import { queryClient, getLoggedInUser } from "./requests";

function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <BasePage>
        <h1>Course Signup App</h1>
        {!!loggedInUser ? (
          <Router>
            <Switch>
              <Route exact path="/">
                <CourseList />
              </Route>
              <Route exact path="/courses">
                <CourseList />
              </Route>
              <Route exact path="/course/:id">
                <CourseInfo />
              </Route>
              <Route path="/course/:id/section/:sectionId">
                <SectionPage />
              </Route>
            </Switch>
          </Router>
        ) : (
          <LoginForm />
        )}
      </BasePage>
    </QueryClientProvider>
  );
}

export default App;
