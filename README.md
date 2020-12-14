# Take Home Exercise

You will have **a week** to complete the following take-home exercise. Please use Javascript to code the following exercise. We know Javascript is not everyone's primary coding language.**We will NOT be grading you on how well you know Javascript**, but rather on the deeper technical knowledge of code design patterns and best practices.

When submitting your exercise please include:

- A Readme for how to run the application and any tests (including any dependencies that must be downloaded). Also feel free to include any notes or tidbits about thought process as you tackled the exercise.

- Any comments to explain particular logic or call out something cool!

To submit your exercise, please create a repository in Github and email the link to [eng@join-real.com](mailto:eng@join-real.com). Also please email with any questions you may have. Happy Coding!

---

## Exercise: Course Sign-up

Create an application (Frontend and Backend) that allows people to sign up for courses. Courses are structured in the following way:

- Each course has 4 sessions, and each session's content is released on a weekly basis.

- A new section of the course is opened for sign up every 2 weeks.

- There is a cap of 10 people per course section.

## Notes

- Make sure you have `yarn` installed on your machine. If you do not, please run:

```
brew install yarn
```

- A basic NodeJS `express` server is set up, though feel free to use any NodeJS framework you may be comfortable with. To run the app:

```
yarn && yarn start
```

- A `create-react-app` project is included to use for frontend, but again feel free to use whatever framework (or none) you are comfortable with! (We are not judging design/ your CSS skills). To run the app:

```
yarn && yarn start
```

- There is some test data included in `data/` as a starting point to seed your database.

## Requirements

- A Postgres database should be set up to store courses, sections, sessions, and sign ups. Included is a `docker-compose.yml` file that spins up a Postgres db on `localhost:5560`.

- All session titles and descriptions for a course should be visible to users before sign up.

- A session's content should be visible only by people who have signed up for the course.

- A list of users signed up for each course section should be visible.

- A user should be able to register for a course and remove themselves from the course.

# Sarah Self Thoughts

- A course has:
  - id
  - name
  - description
  - 4 sessions
  - sections that open every two weeks
- A section has
  - up to 10 enrolled users
  - An associated course
  - A start date
- A session has:
  - id
  - An associated course
  - A session number
  - name
  - description
- A user has
  - courses in which they are enrolled
- A user can
  - enroll in a section
  - leave a section

To Do:

- Connect DB to FE
- Tests
- Front End Pages
  - Log in page
  - "Landing Page"
    - List of courses
    - Section start dates
  - Course Page
    - Course name/description
    - Section dates
  - Section Page
    - Course name
    - Session Dates
    - Enrolled users
    - Enroll/unenroll
- Tests
- Write/Clean up/Finish DB

## Instructions

### Run and Seed the Database

Run the postgres database in the docker container by navigating to `/server` and running the command `docker-compose run db`. To seed the database, open another terminal to the same directory (`/server`) and run `yarn seed`. This will run a script that seeds the database with the provided sample data.

To shut down the database, run `docker-compose down`. Note that if you wish to restart the database, you will need to re-seed it.

## Running The App

In order for the app to be fully operational, the database, server, and frontend apps must all be running.

To run the database, follow the instructions above.

To run the server, navigate to the `/server` folder in your terminal. Run `yarn install` to confirm that you have the latest `node_modules`, then run `yarn start`. This will run the server on port `8080`. Note that the frontend is sending requests to this port, so it cannot currently be changed (in a real world situation, I would use an environmental variable to determine the server URL).

To run the frontend application, navigate to the `/course-client` folder. Run `yarn install` to confirm that you have the latest `node_modules`, then run `yarn start`. This will run the React app on port 3000, and the page will load automatically in your browser (yay create-react-app). Note that this port cannot be changed due to the CORS settings on the server.

## Running Tests

To run the server and database tests (written using Jest and Supertest), navigate to the `/server` folder and run `yarn test`.
To run the frontend tests (written using Jest and React Testing Library), navigate to the `/course-client` folder and run `yarn test`.

## Decision Log

### Database

I decided to use Sequelize for database modeling because that's what I've used in the past. My initial plan was to create a relationship between the `Section` and `User` tables (because a user is enrolled in a section), but I realized while writing the API code that for what I was building, it was easier to just have the sectionId as a field on the User model.
For a full production database, creating that relationship would likely be the easier method.

### User Login

For the purpose of simplicity, I decided to let the frontend handle the decision as to whether a user is logged in or not (there is a `/login` endpoint, but all it does is confirm that the user's password is correct). In an real world situation, I would add some session handling middleware to handle the user's logged in/out state.

## Questions I Had To Answer 
### Can a user enroll in more than one course at a time?
My initial thought was yes, but when creating the models, I decided that it would be easier to only allow a user to be enrolled in one course (/section) at a time.

## Next Steps:

- Finish API Tests
- Frontend - set up redux or react-query
- Log-In Page
- Login Page Test

## Things To Add If I Have Time
- Update login to use session?

** When writing tests, let my personality shine through - use baseball, disney, harry potter examples

\*\* Create a frontend helper file (`request.js`?) that contains all of the data fetching functions?

\*\* React Query instead of redux for frontend?

\*\* CODE FORMATTING
