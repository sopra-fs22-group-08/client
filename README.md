# SoPra FS22 Group 08 - NoBrainer

## Introduction

Our project aims to create an alternative flashcard learning tool to the big names
of 'Anki' and 'Quizlet'.

We wanted to create something useful after the completion of the SoPra course and
as we know that learning can sometimes be very "unfun", therefore we try to make
the learning as easy and seamless as possible and give a satisfying feedback to
the user.

We thought of making the process more fun and competitive by adding a 'player vs player'
mode, called 'Duel', apart from the classic 'solo' learning experience.

[Click here to visit our website!](https://sopra-fs22-group08-client.herokuapp.com/)

## Technologies

- The project has been written in REACT (HTML, SCSS, javascript). 
- The deployment happens on Heroku. 
- A Text-To-Speech API (Web Speech API) and a Email Sending API (SendGrid) have been used.

## High-Level Components

-   [`MultiplayerTool`](https://github.com/sopra-fs22-group-08/client/blob/master/src/components/views/MultiplayerTool.js):
    one of the core components that make the our application stand out from other
    flashcard applications. It allows the user to test his knowledge in a competitive
    manner against his other users that are currently online. To increase accessibility
    for all users a **Text-To-Speech API** (_Web Speech API_) has been integrated
    which reads the question and all possible answers to the user.

-   [`LearningTool`](https://github.com/sopra-fs22-group-08/client/blob/master/src/components/views/LearningTool.js):
    very similar to the MultiplayerTool with the minor difference that you can just
    go through the cards on your own. The user can learn the cards so that he can
    feel confident on challenging other players on their decks. To increase accessibility
    for all users a **Text-To-Speech API** (_Web Speech API_) has been integrated
    which reads the question and all possible answers to the user.

-   [`Home`](https://github.com/sopra-fs22-group-08/client/blob/master/src/components/views/Home.js):
    displays the private and public decks of the user and any invitations received

-   [`Library`](https://github.com/sopra-fs22-group-08/client/blob/master/src/components/views/Library.js):
    in the library the user sees all public decks created by himself or other users.
    He can click on decks and go to the CardOverview or simply search for a specific
    deck by using the search bar.

-   [`CardOverview`](https://github.com/sopra-fs22-group-08/client/blob/master/src/components/views/CardOverview.js):
    contains the overview of the Card Deck, the possibility to edit the deck and add
    or delete cards as well as edit their content. It also displays all users that
    are currently online and therefore can be challenged on that deck. Instead of
    challenging other players he can just click on the deck and learn on his own.

## Launch & Deployment

For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:

```bash
npm install
```

Run this command before you start your application for the first time. Next, you can start the app with:

```bash
npm run dev
```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the
browser.

Notice that the page will reload if you make any edits.

### Build

Finally, `npm run build` builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the
best performance: the build is minified, and the filenames include hashes.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Illustrations

- On the 'landingpage' is a register-button to create a user.
<img width="720" alt="Landingpage" src="https://user-images.githubusercontent.com/45210978/170867778-ae8e2577-bb18-4a7b-bb12-7b3f68f722f5.jpg">

- Decks are generated with the Creator.
<img width="720" alt="Home1" src="https://user-images.githubusercontent.com/91237594/170858790-511af7d0-8dd0-458e-9dac-82d021f4e2d2.png">

- When a deck is created, there is an overview-page. Where you can edit the deck
or challenge other users.
<img width="720" alt="CardOverview" src="https://user-images.githubusercontent.com/91237594/170858785-b5ab0075-83db-4667-bf9d-c418daa0cc8f.png">

- Editing Deck under CardOverview

<img width="720" alt="Edit Decks" src="https://user-images.githubusercontent.com/45210978/170868531-054a328a-258f-48b7-9cbe-d4dbadc94823.jpg">

- If a user challenges you to a game. You are going to see an invitation on the
'homescreen'.
<img width="720" alt="Home2" src="https://user-images.githubusercontent.com/91237594/170858796-5abffa6d-dfac-43c2-a945-bd9626044c5c.png">

- The cards in the game consists of one question and four possible answers.
<img width="720" alt="Mptool" src="https://user-images.githubusercontent.com/45210978/170867782-9c2d8b6c-a454-4030-94b8-a4a0ec472a47.jpg">

## Roadmap

-   [ ] add feature to add and challenge friends
-   [ ] add feature for open question cards
-   [ ] add possibility to add LaTeX formatting to questions and answers
-   [ ] add possibility to add pictures to questions and answers
-   [ ] embed a payment system for decks created by other users

## Authors & Acknowledgements

-   [Andrin Reding](https://github.com/aredin69)
-   [Nico Reding](https://github.com/niredi)
-   [Robert Hemenguel](https://github.com/RibelH)
-   [Tim Portmann](https://github.com/tportmann-uzh)
-   [Armin Veres](https://github.com/arminveres)

## License

[Apache License, 2.0](./LICENSE)
