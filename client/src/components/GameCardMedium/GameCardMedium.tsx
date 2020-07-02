import React, { FunctionComponent  } from 'react';
import './GameCardMedium.scss'


type GameCardMediumProps = {
  //
};

const game: any =
  {
    steamid: 444090,
    name: 'Paladins',
    description: '<p>Paladins (also known as Paladins: Champions of the Realm) is a free-to-play multiplayer first-person shooter. The game is, according to developers, influenced by Team Fortress 2 and is an example of hero shooter subgenre: a type of multiplayer shooter in which you choose to play as one of the pre-made characters with unique abilities and weapons¬.  <br />\nThe primary game mode in Paladins is the siege. Two teams are fighting for the capture point in the center of the map. When a team successfully seizes the capture point, it gets 1 Objective Point, and the Payload spawns for them. Now they must escort the Payload to the enemy’s base to get additional Objective Point. The hostile team can, however, steal the Payload to get Objective Point themselves. Once a team gets 4 Objective Points, it wins the match. <br />\nThere are more than 38 heroes (or “champions” as they are called in the game) available in Paladins. Initially, the player has access to 5 of them at any time, and 4 more are in a two-week rotation. To permanently get any other champion, the player has to buy the champion via in-game currency or buy the champions pack for real money.</p>',
    background_image: 'https://media.rawg.io/media/screenshots/88b/88b5f27f07d6ca2f8a3cd0b36e03a670.jpg',
    rating: 0.195,
    rating_reason: 'The metacritic score for this game is high among similar games that you have enjoyed.',
    tags: '#Hero Shooter #Free to Play #Multiplayer'
  };


const GameCardMedium: FunctionComponent = () => {
  return (
    <div>
      <h1 className="nameMedium">{game.name}</h1>
      <div className ="allDetailsMedium">
        <div className="mainDetailsMedium">
          <img className="gameImg" src={`${game.background_image}`}></img>
        </div>

        <div className ="subDetailsMedium">
          <div className="rating">Rating: <span className="ratingNumber">{game.rating * 100}</span></div>
          <div className="reason">Wreck Reasoning: <span className="reasonTxt">{game.rating_reason}</span></div>
          <div className="purchased">X Days since purchase</div>
          <div className="description">{game.description}</div>
          <div className="tags">{game.tags}</div>
        </div>
      </div>

      <h1 className="nameMedium">{game.name}</h1>
      <div className ="allDetailsMedium">
        <div className="mainDetailsMedium">
          <img className="gameImg" src={`${game.background_image}`}></img>
        </div>

        <div className ="subDetailsMedium">
          <div className="rating">Rating: <span className="ratingNumber">{game.rating * 100}</span></div>
          <div className="reason">Wreck Reasoning: <span className="reasonTxt">{game.rating_reason}</span></div>
          <div className="purchased">X Days since purchase</div>
          <div className="description">{game.description}</div>
          <div className="tags">{game.tags}</div>
        </div>
      </div>

      <h1 className="nameMedium">{game.name}</h1>
      <div className ="allDetailsMedium">
        <div className="mainDetailsMedium">
          <img className="gameImg" src={`${game.background_image}`}></img>
        </div>

        <div className ="subDetailsMedium">
          <div className="rating">Rating: <span className="ratingNumber">{game.rating * 100}</span></div>
          <div className="reason">Wreck Reasoning: <span className="reasonTxt">{game.rating_reason}</span></div>
          <div className="purchased">X Days since purchase</div>
          <div className="description">{game.description}</div>
          <div className="tags">{game.tags}</div>
        </div>
      </div>
    </div>
  )
};


export default GameCardMedium;
