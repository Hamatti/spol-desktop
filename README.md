# SPOL Desktop (working title)

_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [Electron](https://electronjs.org/) for desktop apps._

This project is an Electron app for FTHA to manage registrations, run tournaments (regular ranking, cup, team) and sync everything to server.

## How to run

Clone this project and run

`npm install`

to install required packages.

After that, you can start the Electron app (/w hot reload!) with

`npm run electron-dev`

or run tests with

`npm test`

Tests should live in `src/tests` and be named as `[something].test.js`.

To build a dmg that can be run in production, run

`npm run dist`

## Eventually there will be...

### Token-based authentication

The user will start the application usage by providing an authentication token that will be used to auth with server and decide which features are available.

### Registration

Easy-to-use registration for multiple series, including option to download membership data (for different pricing), seeded ranking data, or use pre-registration data to speed things up.

### Ranking tournament results

A replacement for current peli.jar. The idea is that you can run everything inside this. Automatically get player lists from registration module into tournaments and auto-advance from basic groups to division/final groups and playoffs.

### Cup

Run single-elimination cup tournaments with seeded or randomized order.

### Team Tournament

Run a team tournament with detailed results for each game.

### Help / Manual

Built-in manual to help with common challenges.

### Local & Cloud Save

Automatically save changes to server for live results and keep backups on your own computer
