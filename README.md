# Frontend Take-Home Exercise: Real-Time Stock Dashboard

Welcome to the frontend developer take-home exercise! 
For this assignment, candidates are asked to build a real-time stock tracking dashboard.

## Objective

Create a Single Page Application (SPA) dashboard that displays a list of stocks. The application should fetch an initial list of stocks and their prices, then update those prices in real-time.

Please do not use AI to complete this exercise.

## Tech Stack Requirements
Your solution MUST use the following technologies:
- React 18
- TypeScript (Strict mode enabled)
- Redux Toolkit (for state management)
- Axios (for initial fetching)
- Jest / React Testing Library (for unit testing)

CSS can be written in vanilla CSS, CSS Modules, or any CSS-in-JS library you are comfortable with. 

## The Mock Service

This boilerplate comes with a mock service located in `src/services/mockStockService.ts`. It exposes two methods:
1. `GET /stocks.json`: A static endpoint mimicking an API response. You MUST use Axios to request this file (e.g., `axios.get('/stocks.json')`) to fetch the starting list of stocks. 
2. `subscribeToStockUpdates(callback)`: Provides a real-time feed that triggers your callback with a single updated stock object every second.

## Requirements

1. **Architecture**: Set up Redux Toolkit to store `stocks`. Assume the application could grow. Structure your files and slices cleanly.
2. **Dashboard UI**:
    - Build a grid or list of stocks showing symbol and current price.
    - Provide a clean and modern design. It does not have to be overly complex but should demonstrate your CSS/UI skills.
3. **Real-Time Updates**:
    - When a price updates, display it in red if it has gone down since last update, green if it has gone up.
4. **Testing**:
    - Write unit tests for your Redux slice (reducers).
    - Write at least one component test that renders the stock list using Jest and React Testing Library.

**Bonus**:
- When a price updates, temporarily highlight the stock cell/item (e.g., flash green if the price goes up, and red if it goes down).

## Getting Started

1. Make sure you're using node version >= 20
2. `npm install`
3. `npm run dev`

To run tests:
`npm run test`

## Submission Guidelines

Please zip your project (excluding the `node_modules` folder) or provide a link to a public GitHub repository. Include instructions on how to start the app if you modified the scripts.

Good luck!
