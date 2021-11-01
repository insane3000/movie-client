export interface MovieIT {
  _id: string;
  title: string;
  rating: Number;
  year: string;
  genre: string;
  time: string;
  actors: string;
  synopsis: string;
  link: string;
  image: string;
}

export const movieTemplate = {
  _id: "",
  title: "",
  rating: 0,
  year: "",
  genre: "",
  time: "",
  actors: "",
  synopsis: "",
  link: "",
  image: "",
};
