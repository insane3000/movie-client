import styled from "styled-components";
import MoviePoster from "../molecules/MoviePoster";
import { useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
const SearchSt = styled.div`
  width: 100%;
  height: 100%;

  .container-movies {
    width: 100%;
    height: 100%;
    display: grid;
    /* grid-template-columns: repeat(2, 20rem); */
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 20rem));

    grid-auto-rows: 30rem;
    justify-content: center;
    align-content: flex-start;
    gap: 1rem;
    overflow-y: scroll;
    padding: 2rem 2rem;
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;

    .container-movies {
      width: 100%;
      height: 100%;
      display: grid;
      /* grid-template-columns: repeat(4, 20rem); */

      grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
      grid-auto-rows: 35rem;
      justify-content: center;
      align-content: flex-start;
      gap: 1rem;
      overflow-y: scroll;
      padding: 2rem 10rem;
    }
    .alertEmptyMovies {
      font-family: "Roboto 900";
      font-size: 2rem;
    }
  }
`;

const Search = () => {
  const app = useSelector((store: StoreInterface) => store.app);

  return (
    <SearchSt>
      <div className="container-movies">
        {app.search.length !== 0 ? (
          app.search.map(
            (i) => i && <MoviePoster key={i.title} img={i.image} id={i._id} />
          )
        ) : (
          <h1 className="alertEmptyMovies">Ningun resultado.</h1>
        )}
      </div>
    </SearchSt>
  );
};

export default Search;
