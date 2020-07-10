interface Game {
  appid: number;
  name: string;
  description: string;
  description_short: string;
  description_about: string;
  description_steam: string;
  background_image: string;
  rating: number;
  rating_reason: string;
  tags: [string];
  isFav: boolean;
  metacritic_url: string;
  screenshots: [{
    _id: string,
    id: string,
    path_thumbnail: string,
    path_full: string,
  }];
  dateAdded: Date;
};

export default Game;