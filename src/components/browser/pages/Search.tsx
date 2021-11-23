import styled from "styled-components";
import MoviePoster from "../molecules/MoviePoster";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { useEffect, useRef } from "react";
import { restartScroll } from "redux/actions/appAction";
const SearchSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    overflow-y: scroll;
    .title-component {
      width: 80%;
      height: 3rem;
      line-height: 3rem;
      font-family: "Roboto 900";
      font-size: 4rem;
      text-align: center;
      margin-top: 1rem;
      margin-bottom: 1rem;
      text-transform: capitalize;
    }
    .container-movies {
      width: 80%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10rem, 18rem));
      /* grid-template-columns: 18rem 18rem 18rem 18rem; */
      grid-auto-rows: 28rem;
      justify-content: center;
      align-content: flex-start;
      gap: 1rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    .alertEmptyMovies {
      font-family: "Roboto 900";
      font-size: 2rem;
    }
  }
`;

const Search = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);
  const restoreScroll = () => {
    dispatch(
      restartScroll(
        "search",
        searchRef.current === null ? 0 : searchRef.current.scrollTop
      )
    );
  };
  useEffect(() => {
    searchRef.current && (searchRef.current.scrollTop = app.scroll.search);
  });
  return (
    <SearchSt ref={searchRef} onClick={restoreScroll}>
      <h2 className="title-component"> </h2>
      <div className="container-movies">
        {app.search.length !== 0 ? (
          app.search.map(
            (i) =>
              i && (
                <MoviePoster
                  key={i.title}
                  img={i.imageM}
                  id={i._id}
                  rating={i.rating}
                  title={i.title} 
                  year={i.year}
                />
              )
          )
        ) : (
          <h1 className="alertEmptyMovies">Ningun resultado.</h1>
        )}
      </div>
    </SearchSt>
  );
};

export default Search;
