
# SoPra FS22 Group 08 - NoBrainer

## Introduction

Our project aims to create an alternative flashcard learning tool to the big names
of 'Anki' and 'Quizlet'.
We try to make learning as easy and seamless as possible and the feedback unobtrusive.
Part of our motivation was that we also wanted to work on something that would provide useful functionalities to us as students after the completion of the SoPra course.
We know that learning can sometimes be very "unfun" and therefore we thought of making the process more competitive by adding a player vs player mode apart from the classic "solo" learning experience.

## Technologies

The project has been written in REACT (HTML, SCSS, javascript). The deployment happens on Heroku. A Text-To-Speech API (Web Speech API) and a Email Sending API (SendGrid) have been used.

## High-Level Components

- [`MultiplayerTool`](https://github.com/sopra-fs22-group-08/client/blob/master/src/components/views/MultiplayerTool.js):  one of the core components that make the our application stand out from other flashcard applications. It allows the user to test his knowledge in a competetive manner against his other users that are currently online. To increase accessibility for all users a **Text-To-Speech API** (*Web Speech API*) has been integrated which reads the question and all possible answers to the user.

- [`LearningTool`](https://github.com/sopra-fs22-group-08/client/blob/master/src/components/views/LearningTool.js):  very similar to the MultiplayerTool with the minor difference that you can just go through the cards on your own. The user can learn the cards so that he can feel confident on challenging other players on their decks. To increase accessibility for all users a **Text-To-Speech API** (*Web Speech API*) has been integrated which reads the question and all possible answers to the user.

- [`Home`](https://github.com/sopra-fs22-group-08/client/blob/master/src/components/views/Home.js):  displays the private and public decks of the user and any invitations received

- [`Library`](https://github.com/sopra-fs22-group-08/client/blob/master/src/components/views/Library.js):  in the library the user sees all public decks created by himself or other users. He can click on decks and go to the CardOverview or simply search for a specific deck by using the search bar.

- [`CardOverview`](https://github.com/sopra-fs22-group-08/client/blob/master/src/components/views/CardOverview.js):  contains the overview of the Card Deck, the possibility to edit the deck and add or delete cards as well as edit their content. It also displays all users that are currently online and therefore can be challenged on that deck. Instead of challenging other players he can just click on the deck and learn on his own.


## Launch & Deployment


For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:

```bash
npm install
```

Run this command before you start your application for the first time. Next, you can start the app with:

```bash
npm run dev
```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Notice that the page will reload if you make any edits.

### Build
Finally, `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Illustrations

On the landingpage is a register-button to creat a user. 
<img width="1153" alt="Screenshot 2022-05-21 at 13 30 28" src="https://user-images.githubusercontent.com/91237594/169659835-a56f6806-1b40-4807-a00e-5fa84d6905ce.png">

Decks are generated with the Creator.
<img width="1199" alt="Screenshot 2022-05-29 at 09 58 37" src="https://user-images.githubusercontent.com/91237594/170858790-511af7d0-8dd0-458e-9dac-82d021f4e2d2.png">

When a deck is created, there is an overview-page. Where you can edit the deck or challenge other users.
<img width="1191" alt="Screenshot 2022-05-29 at 09 59 08" src="https://user-images.githubusercontent.com/91237594/170858785-b5ab0075-83db-4667-bf9d-c418daa0cc8f.png">

If a user challenges you to a game. You are going to see an invitation on the homescreen.
<img width="1182" alt="Screenshot 2022-05-29 at 09 57 53" src="https://user-images.githubusercontent.com/91237594/170858796-5abffa6d-dfac-43c2-a945-bd9626044c5c.png">

The cards in the game consists of one question and four possible answers.
<img width="1244" alt="Screenshot 2022-05-21 at 13 39 05" src="https://user-images.githubusercontent.com/91237594/169659890-4001d986-6363-467e-9701-8dad58ff4436.png">


## Roadmap
- Adding LaTeX Questions and Answers To Cards
- Adding Picture Questions and Answers To Cards
- Embed a Payment System for Card Decks created by other Users

## Authors & Acknowledgements

-   [Andrin Reding](https://github.com/aredin69)
-   [Nico Reding](https://github.com/niredi)
-   [Robert Hemenguel](https://github.com/RibelH)
-   [Tim Portmann](https://github.com/tportmann-uzh)
-   [Armin Veres](https://github.com/arminveres)

## License

[Apache License, 2.0](./LICENSE)
