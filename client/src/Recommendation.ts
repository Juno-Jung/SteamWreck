interface Recommendation {
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
}

export default Recommendation;