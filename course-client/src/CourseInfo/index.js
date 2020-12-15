import React from "react";
import { useGetCourseDataQuery } from "../requests";
import { Link } from "react-router-dom";
import "./index.css";

const CourseInfo = () => {
  const { status, data } = useGetCourseDataQuery();
  let pageContent;

  if (status === "success") {
    const { course, sections, sessions, users } = data;
    pageContent = (
      <>
        <h2>{course.name}</h2>
        <h4>Upcoming Start Dates:</h4>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              {section.dateStart}{" "}
              <Link to={`${course.id}/section/${section.id}`}>
                Enroll in this Section
              </Link>
            </li>
          ))}
        </ul>
        <h4>Sessions in This Course:</h4>
        {sessions
          .sort((a, b) => a.sessionNumber - b.sessionNumber)
          .map((session) => (
            <div key={session.id} className="session">
              <span className="name">
                {session.sessionNumber}. {session.name}
              </span>
              <p className="description">{session.description}</p>
            </div>
          ))}
      </>
    );
  } else if (status === "loading") {
    pageContent = (
      <div>Please be patient, this course will be with you shortly</div>
    );
  } else {
    pageContent = <div>Error Loading Course</div>;
  }

  return (
    <>
      {pageContent}
      <Link to="/courses">Return to Course List</Link>
    </>
  );
};

export default CourseInfo;
