# SteamWreck

Create an application that will authenticate a Steam user, and respond with features based on their user data. These features include recommendations on what game they should play next, what they should buy, what games to avoid, etc. There will also be a list/graph/chart of generic recommendations and reviews on the front page. The application will be responsive for all devices.

## Installation

1. Clone the repository https://github.com/Juno-Jung/SteamWreck onto your local computer.
2. Run npm install in the server folder.
3. Create an .env file in your server root folder with the environment variables shown below.
4. Run nodemon in the server root folder.

## Set up your server environment

For this project, we use a MongoDB Cloud Atlas database.

Create an .env file in the server folder with the following variables:

    HOST=localhost
    PORT=3001
    DB_URI=MONGODB_URI