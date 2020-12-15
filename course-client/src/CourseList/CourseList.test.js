import React from "react";
import { render, getByText, screen } from "@testing-library/react";
import { when } from "jest-when";
import { useQuery } from "react-query";
import { MemoryRouter } from "react-router-dom";

import CourseList from "./";

const mockedCourses = [
  {
    id: 1,
    name: "How To Score A Baseball Game",
    description: "A guide to taking your baseball enjoyment to the next level",
  },
  {
    id: 2,
    name: "Why Hockey Is the Best Sport",
    description:
      "A comprehensive overview of the fast pace and deep strategy of the best game played on ice",
  },
];
jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useQuery: (query, options) => ({
    status: "success",
    data: mockedCourses,
  }),
}));

describe("CourseList", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <CourseList />
      </MemoryRouter>
    );
  });

  it("Renders all courses", () => {
    const courses = screen.getAllByTestId("course-in-list");
    expect(courses).toHaveLength(2);
    screen.getByText("How To Score A Baseball Game");
    screen.getByText("Why Hockey Is the Best Sport");
  });
  it("Renders course name and description", () => {
    screen.getByText("How To Score A Baseball Game");
    screen.getByText(
      "A guide to taking your baseball enjoyment to the next level"
    );
  });
  it("Renders link to detail page", () => {
    const courses = screen.getAllByTestId("course-in-list");
    const link = getByText(courses[0], "More Info");
    link.click();
  });
});
