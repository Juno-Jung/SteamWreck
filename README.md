# SteamWreck

SteamWreck is an application that uses the public profile data of a Steam user and responds with game recommendations from their unplayed games. Other features include additional details on the games themselves, as well as links to their associated Steam page, Metacritic page and Discord should they be provided. The recommendation is determined by an algorithm that relies on information about the tags, genres and metacritic score of a game, as well as how many friends also have the game if it is multiplayer. We hope that you enjoy your wreckomendations!

Created by: Ali Gazitepe, Juno Jung, Lena Deorditsa, Pat Rivet.

## Screenshots

![SteamWreck Logo](/assets/SteamWrecked.png?raw=true "SteamWreck Logo")
![SteamWreck Home Page](/assets/SteamWreck-Front.png?raw=true "SteamWreck Home Page")
![SteamWreck Favourites](/assets/SteamWreck-Fave.png?raw=true "SteamWreck Favourites")
![SteamWreck Game Details](/assets/SteamWreck-Details.png?raw=true "SteamWreck Game Details")

## Tech Stack

### Front End

React-Redux\
SASS\
Jest\
TypeScript

### Back End

Express\
Mocha\
Chai\
MongoDB\
Mongoose
Steam API\
Rawg API

## Installation

1. Clone the repository https://github.com/Juno-Jung/SteamWreck.git onto your local computer.
2. Run npm install in the client folder.
3. Run npm install in the server folder.
4. Create an .env file in your server root folder with the environment variables shown below.
5. Run nodemon in the server root folder.
6. Run npm start in the client folder.

## Set up your server environment

For this project, we use a MongoDB Cloud Atlas database.

Create an .env file in the server folder with the following variables:

    HOST=localhost
    PORT=3001
    DB_URI=MONGODB_URI
    BASE_METACRITIC_URL=https://www.metacritic.com
    STEAM_API_KEY=YOUR_STEAM_API_KEY
    STEAM_GET_USER_SUMMARY_URL=http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002
    STEAM_GET_USER_LIBRARY_URL=http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001
    STEAM_GET_USER_FRIENDS_URL=http://api.steampowered.com/ISteamUser/GetFriendList/v0001
    STEAM_GET_GAME_DETAILS_URL=https://store.steampowered.com/api
    RAWG_BASE_URL=https://api.rawg.io/api
    TAG_WEIGHT=YOUR_TAG_WEIGHT_FOR_RATING_GAMES
    GENRE_WEIGHT=YOUR_GENRE_WEIGHT_FOR_RATING_GAMES
    METACRITIC_WEIGHT=YOUR_METACRITIC_WEIGHT_FOR_RATING_GAMES
    FRIEND_WEIGHT=YOUR_FRIEND_WEIGHT_FOR_RATING_GAMES

## Weight Variables

The environment variables TAG_WEIGHT, GENRE_WEIGHT, etc. are numbers that add up to one that determine the rating a game receives for a particular user. The default values we used are shown before, but you may modify them to see different results.

    TAG_WEIGHT=0.5
    GENRE_WEIGHT=0.15
    METACRITIC_WEIGHT=0.25
    FRIEND_WEIGHT=0.1

## Populate your database

In order to reduce loading times when asking for game information, we want to have the details of a game stored in our database instead of making an API call. The app avoids storing all user games into the database and only does so for the necessary ones in order to reduce loading times. We use a background worker to store the game details of all other user games during off hours to speed up loading times in the future.

1. Set a time for the background worker to run in schedule.js of background_workers. Hour is based off of a 24 hour cycle.
2. Run schedule.js.

Alternatively, you can uncomment line 52 of update-db.js and run the file to update the database with games immediately. Remember to comment the line afterwards if you plan to use the schedule to update the database afterwards.
