# The Cat Quiz

## About

The Cat Quiz is a small side project, using (The Cat API)[https://thecatapi.com/] to 
implement a game. The game is about guessing the cats breeds based on images.
It is fully mobile compatible.

(Demo)[https://the-cat-quiz.herokuapp.com]

## Up and running

- Install nodejs
- Register an API key on (https://thecatapi.com/)[https://thecatapi.com/]
- Rename `.env.example` to `.env`, and fill the values.
- `npm run build` to build the app
- `npm run serve` to start a local server
- visit the address printed out

## Development

- The app is a React app made with a `create-react-app`. 
- It uses `styled-components` for styling.
- It is prepared to run in Heroku.
- The server is an `express` app with some basic security with `helmet` and `express-rate-limiter`.
- The server simply proxy the `/cat-api/*` requests to the cat api service, adding the API Key, hiding it from the frontend.

## Roadmap

- [x] better look on large screens
- [x] correct look on mobile screens
- [ ] add pop-up messages or toaster (wrong / correct answers, error messages)
- [ ] add animations
- [ ] scroll to top (on mobile) when a question is answered
- [ ] add game finish popup/toaster, highlight the scores
- [ ] add some info about the breed when the question is answered