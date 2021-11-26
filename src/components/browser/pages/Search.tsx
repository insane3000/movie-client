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
    height: auto;
    /* overflow-y: scroll;
    position: relative; */
    padding-bottom: 2rem;
    .title-component {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      font-family: "Roboto 700";
      font-size: 1.5rem;
      text-align: start;
      /* margin-top: 6rem; */
      color: #d3d3d3;
      padding: 0 10rem;
    }
    .container-movies {
      width: 100%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10rem, 13rem));
      grid-auto-rows: 23rem;
      justify-content: center;
      align-content: flex-start;
      gap: 2rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding: 0 10rem;
    }
    .no-data {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      font-family: "Roboto 100";
      font-size: 1rem;
      text-align: center;
      /* text-transform: uppercase; */
      /* margin-top: 6rem; */
      color: #d3d3d3;
      padding: 10rem 10rem;
    }
    .loadMore {
      width: 100%;
      height: 3rem;
      /* background: red; */
      color: white;
      text-align: center;
      line-height: 3rem;
      font-family: "Roboto 300";
      font-size: 1rem;
    }
  }
`;

const Search = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);
  const restoreScroll = () => {
    dispatch(restartScroll("search", searchRef.current === null ? 0 : searchRef.current.scrollTop));
  };
  useEffect(() => {
    searchRef.current && (searchRef.current.scrollTop = app.scroll.search);
  });
  return (
    <SearchSt ref={searchRef} onClick={restoreScroll}>
      {app.search.length !== 0 && <h2 className="title-component">Resultados de busqueda:</h2>}
      <div className="container-movies">
        {app.search.map(
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
        )}
      </div>
      {app.search.length === 0 && <h2 className="no-data">"No se encontraron resultados."</h2>}
    </SearchSt>
  );
};

export default Search;
