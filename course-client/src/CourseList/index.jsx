import React from "react";
import fetch from "node-fetch";

const CourseList = () => {
  const [courses, setCourses] = React.useState([{}]);

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:8080/api/courses");
      const data = await response.json();
      await setCourses(data);
    };

    getData();
  }, []);

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
