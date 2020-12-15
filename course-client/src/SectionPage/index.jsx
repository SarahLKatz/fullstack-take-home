import React from "react";
import { useParams } from "react-router-dom";
import { useGetCourseDataQuery } from "../requests";

const EnrollmentPage = () => {
  const { id: courseId, sectionId } = useParams();

  return (
    <div>
      This page will contain information about the section (course name, section
      start date, users) and give users the option to enroll in or remove
      themselves from this section
    </div>
  );
};

export default EnrollmentPage;
