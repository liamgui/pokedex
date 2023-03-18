# Pokedex

## Description

This is a simple pokedex app prototype that uses a graphQL API to fetch data and perform viewing, favoriting and filtering.


## Installation

1. Clone the repo
2. Run `npm install` to install dependencies
3. Run `npm start` to start the app

## User Stories

- [x] User can view a list of all pokemon
- [x] User can view a grid of all pokemon
- [x] User can view the details of a pokemon including evolutions
- [x] User can favorite a pokemon
- [x] User can filter pokemon by name with a search bar
- [x] User can filter pokemon by type with a dropdown
- [x] User can filter pokemon by favorited
- [x] User can view more pokemon when scrolling to the bottom of the list

## Usage

1. Click on the pokemon to view more details
2. Click on the heart icon to favorite a pokemon
3. Click on the types dropdown to filter by type
4. Click on the favorites icon at the top right (stacked hearts icon) to filter by favorites
5. Type in the search bar to filter by name
6. Click on the list/grid button at the top right to toggle between list and grid view

## Tech Stack:

### Vue 3

- Why Vue 3?
	- Composition API - makes it easier to write reusable functional code
	- Better TypeScript Support (over Vue 2)
	- Better Performance (over Vue 2)
	- Better Developer Experience (over Vue 2)
	- Better Tooling (over Vue 2)
	- Smaller Bundle Size (over Vue 2)

### Vite

- Vite Pages
- Font Loader

Why: Vite is a new build tool that significantly improves the frontend development experience. It offers features such as hot module replacement, faster builds, and a leaner dev server. It also has a plugin system that allows you to easily add features to your project. Easier to configure than webpack. It sped up my workflow and allowed me to quickly prototype.

### TypeScript

Why: TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It is a great tool for writing large scale applications. It allows you to write code that is easier to maintain, refactor, read, and debug.

### Vue Router

Why: Vue Router is the official router for Vue.js. It allows you to easily create single page applications.

### Pinia

Why: Pinia is a state management library for Vue.js. It is a great alternative to Vuex. It is smaller, simpler, and easier to use. Used it for the filter states and view states to let components communicate with each other without having to rely on emitting events and passing them up and down the chain.

### Vue Apollo (Composables)

- GraphQL

Why: GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. It provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools. Apollo's in memory cache makes it easy to cache data and update the UI when the data changes. (extensively used for favoriting and infinite scroll)-

### PostCSS

Why: Didn't need anything fancy, but wanted to have a few plugins to help with development (nesting and comments). VIte is preconfigured to use PostCSS, so it's easy to use plugins and virtually no configuration.

### Element Plus (UI Library)

Why: Infinite Scroll, TextInput, Select components and functionality - Not many component libraries that work with Vue 3 yet. Element Plus is a great alternative to Vuetify. It is smaller, simpler, and easier to use.

### Chart.js (vue chart.js)

Why: Bar Chart for Pokemon Stats

## Testing:

I used Vitest to write some unit tests for several of the smaller components and stores. I also implemented Cypress to write some end to end tests for the app.


- Vitest (Unit Testing)
- Cypress (E2E Testing)
	- npm run cypress:open

I added a few brief tests for Cypress. These just check some of the functionality of the app's index page. Through testing with Cypress, I did notice that there were several audio clips that responded with a 404 error. I commented out the test that checks for the audio clips as it only applied to an early iteration where the audio clips were on the index page.
Ex. Mr. Mime, Farfetch'd

## New Technologies To Me

- Testing (and by extension Vitest and Cypress testing) was one thing I had to learn for this exercise. Overall, I think there is a lot of room for improvement with testing and I recognize the importance of it.

- I have never worked with Element Plus and Vue Apollo (Composables) before. I had to learn how to use them and how to integrate them into the project. I have used Apollo and GraphQL in other projects with Angular, so I was familiar with the concepts, but not this specific implementation.


## Future Improvements

- Add more tests
- Componentize the Pokemon Details page
- Add weaknesses to api and add to filtering
- Unify color of types from pokemon items and the filter dropdown
- Style Height and Weight with icons/animations
- Debounce search input
- Cleanup composables to be reused across app
