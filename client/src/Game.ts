interface Game {
  appid: number;
  name: string;
  description: string;
  background_image: string;
  rating: number;
  rating_reason: string;
  tags: [string];
};

export default Game;