
# SoPra FS22 Group 08 - NoBrainer

## Introduction
Introduction: the project’s goal and motivation.

Our project aims to create an alternative flashcard learning tool to the big names
of 'Anki' and 'Quizlet'.
We try to make learning as easy and seamless as possible and the feedback unobtrusive.

## Technologies

• Technologies used (short).

The project is written in 'Java' using the Spring Boot Framework, as well as JPA
'Gradle' is used to manage our dependencies and the deployment happens on 'Heroku'

## High-Level Components
• High-level components: Identify your project’s 3-5 main components. What is their role?
How are they correlated? Reference the main class, file, or function in the README text
with a link.

-   [`UserService`](https://github.com/sopra-fs22-group-08/server/blob/master/src/main/java/ch/uzh/ifi/hase/soprafs22/service/UserService.java): contains the logic to create and edit users.
-   [`InvitationService`](https://github.com/sopra-fs22-group-08/server/blob/master/src/main/java/ch/uzh/ifi/hase/soprafs22/service/InvitationService.java): contains the logic to invite other players, handle the
    deletion of the invitations upon acceptance.
-   [`DuelService`](https://github.com/sopra-fs22-group-08/server/blob/master/src/main/java/ch/uzh/ifi/hase/soprafs22/service/DuelService.java): contains the logic to 'Duel', also 1v1 lobbies, where players
    play against each other.

TODO:

-   [ ] expand description

## Launch & Deployment

• Launch & Deployment: Write down the steps a new developer joining your team would
have to take to get started with your application. What commands are required to build and run your project locally? How can they run the tests? Do you have external dependencies or a database that needs to be running? How can they do releases?


For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:

```bash
npm install
```

Run this command before you start your application for the first time. Next, you can start the app with:

```bash
npm run dev
```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Notice that the page will reload if you make any edits. You will also see any lint errors in the console (use Google Chrome).

### Testing
You can run the tests with
```bash
npm run test
```
This launches the test runner in an interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into a 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### Build
Finally, `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Illustrations
• Illustrations: In your client repository, briefly describe and illustrate the main user flow(s) of your interface. How does it work (without going into too much detail)? Feel free to include a few screenshots of your application.

TODO:

-   [ ] add illustrations

## Roadmap
• Roadmap: The top 2-3 features that new developers who want to contribute to your project could add.

TODO:

-   [ ] add roadmap

## Authors & Acknowledgements

-   [Andrin Reding](https://github.com/aredin69)
-   [Nico Reding](https://github.com/niredi)
-   [Robert Hemenguel](https://github.com/RibelH)
-   [Tim Portmann](https://github.com/tportmann-uzh)
-   [Armin Veres](https://github.com/arminveres)

## License
• License: Say how your project is licensed (see License guide3).

TODO:

- [ ] add license specification







