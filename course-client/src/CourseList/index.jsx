import React from "react";
import { getCourses } from "../requests";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const CourseList = () => {
  const { status, data: courses } = useQuery("courses", getCourses);

  return status === "success" ? (
    <div>
      {courses.map((course) => (
        <div key={course.id} data-testid="course-in-list">
          <h2>{course.name}</h2>
          <p>{course.description}</p>
          <Link to={`/course/${course.id}`}>More Info</Link>
        </div>
      ))}
    </div>
  ) : (
    <div />
  );
};

export default CourseList;
