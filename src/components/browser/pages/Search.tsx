import styled from "styled-components";
import MoviePoster from "../molecules/MoviePoster";
import { useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
const SearchSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: auto;
    padding-bottom: 2rem;
    .title-component {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      font-family: "Roboto 700";
      font-size: 1.5rem;
      text-align: start;
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
      overflow: hidden;
      // TODO  A veces se congela el cursor
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
  const app = useSelector((store: StoreInterface) => store.app);

  return (
    <SearchSt>
      {app.search.length !== 0 && <h2 className="title-component">Resultados de busqueda:</h2>}
      <div className="container-movies">
        {app.search?.map((i: any) => (
          <MoviePoster
            key={i._id}
            id={i._id}
            img={i.imageM}
            rating={i.rating}
            title={i.title}
            year={i.year}
          />
        ))}
      </div>
      {app.search.length === 0 && <h2 className="no-data">"No se encontraron resultados."</h2>}
    </SearchSt>
  );
};

export default Search;
