
# SoPra FS22 Group 08 - NoBrainer

## Introduction

Our project aims to create an alternative flashcard learning tool to the big names
of 'Anki' and 'Quizlet'.
We try to make learning as easy and seamless as possible and the feedback unobtrusive.

## Technologies

The project is written in JavaScript, SCSS and HTML. The deployment happens on Heroku.

## High-Level Components

- [`Header`](https://github.com/sopra-fs22-group-08/client/blob/master/src/components/ui/Header.js):  contains the Logo and the burger-menu with whom the user can navigate through the app.

- [`Home`](https://github.com/sopra-fs22-group-08/client/blob/master/src/components/views/Home.js):  contains the players public and privat cards and the invitations to games.

- [`CardOverview`](https://github.com/sopra-fs22-group-08/client/blob/master/src/components/views/CardOverview.js):  contains the overview of the Card Deck, the possibility to edit, learn and challenge the deck.


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

After the registration, the homepage is still empty. Therefore we create some decks with the creator.
<img width="1244" alt="Screenshot 2022-05-21 at 13 33 15" src="https://user-images.githubusercontent.com/91237594/169659854-dda46e8d-41c8-49f6-a488-66883c28896c.png">

When a deck is created, there is an overview-page. Where you can edit the deck or challenge other users.
<img width="1244" alt="Screenshot 2022-05-21 at 13 37 41" src="https://user-images.githubusercontent.com/91237594/169659870-8681df9e-fe05-4e4c-8021-d1d8fa4d66db.png">

If a user challenges you to a game. You are going to see an invitation on the homescreen.
<img width="1244" alt="Screenshot 2022-05-21 at 13 38 42" src="https://user-images.githubusercontent.com/91237594/169659878-f4ddf246-4e07-49e8-9e9c-0859b279ba22.png">

The cards in the game consists of one question and four possible answers.
<img width="1244" alt="Screenshot 2022-05-21 at 13 39 05" src="https://user-images.githubusercontent.com/91237594/169659890-4001d986-6363-467e-9701-8dad58ff4436.png">


## Roadmap
- Adding LaTeX Questions and Answers To Cards
- Adding Picture Questions and Answers To Cards
- Ended a Payment System for Card Decks created by other Users

## Authors & Acknowledgements

-   [Andrin Reding](https://github.com/aredin69)
-   [Nico Reding](https://github.com/niredi)
-   [Robert Hemenguel](https://github.com/RibelH)
-   [Tim Portmann](https://github.com/tportmann-uzh)
-   [Armin Veres](https://github.com/arminveres)

## License

[Apache License, 2.0](./LICENSE)
