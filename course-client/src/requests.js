import { QueryClient, useQuery } from "react-query";
import fetch from "node-fetch";
import { useParams } from "react-router-dom";

export const queryClient = new QueryClient();

export const getCourses = async () => {
  const response = await fetch("http://localhost:8080/api/courses");
  return response.json();
};

const getSectionsForCourse = async (courseId) => {
  const response = await fetch(
    `http://localhost:8080/api/courses/${courseId}/sections`
  );
  return response.json();
};

const getSessionsForCourse = async (courseId) => {
  const response = await fetch(
    `http://localhost:8080/api/courses/${courseId}/sessions`
  );
  return response.json();
};

export const getAllDataForCourse = async ({ queryKey }) => {
  const data = await getCourses();
  const sections = await getSectionsForCourse(queryKey[1]);
  const sessions = await getSessionsForCourse(queryKey[1]);
  return {
    course: data.find((course) => course.id === +queryKey[1]),
    sections,
    sessions,
  };
};

export const useGetCourseDataQuery = () => {
  const { id } = useParams();
  return useQuery(["courses", id], getAllDataForCourse);
};
