import axios from "axios";
import { URI } from "config/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SearchSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .addMedia {
      width: 5rem;
      height: 5rem;
      background: #00000056;
      position: absolute;
      /* right: 1rem; */
      bottom: 1rem;
      border-radius: 100%;
      font-family: "Roboto 100";
      font-size: 4rem;
      color: #ffffff7f;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        background: #ff0055;
        color: #ffffff;
      }
    }
    .table {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 100%;
      grid-auto-rows: 2rem;
      row-gap: 0.2rem;
      /* background: #0c0c0c; */
      overflow-y: scroll;
      /* border-right: 0.0625rem solid #333333; */
      position: relative;
      .tRow {
        display: grid;
        grid-template-columns: calc(15% - 2.5rem) 5% 5% 5% 15% 15% 5% 25% 5% 5%;
        grid-template-rows: 100%;
        column-gap: 0.2rem;
        justify-content: center;
        align-content: center;
        &:hover {
          .cell {
            background: #1c1a2f;
          }
          .head {
            background: #03010a;
          }
        }
        .cell {
          background: #191727;
          line-height: 2rem;
          display: block;
          border-radius: 0.3rem;
          font-family: "Roboto 300";
          font-size: 0.8rem;
          color: white;
          padding: 0 0.5rem;
          // Dots ...
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .number {
            color: red;
            margin-right: 0.5rem;
            font-family: "Roboto 900";
            font-size: 1.5rem;
          }
          .text {
            color: #747474;
            font-size: 0.6rem;
          }
        }
        .head {
          background: #03010a;
          font-family: "Roboto 900";
          font-size: 0.8rem;
          text-align: center;
          /* display: flex;
          justify-content: center;
          align-items: center; */
          .sysIcon {
            width: 100;
            height: 100%;
            justify-self: center;
            align-self: center;
            font-size: 1rem;
          }
          .text {
            width: 60%;
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
          }
          .noneText {
            display: none;
          }
        }
        .none {
          display: block;
        }

        .action {
          background: #6200ff;
          color: #ffffff;
          cursor: pointer;
          font-family: "Roboto 900";
          text-decoration: none;
          &:hover {
            background: #ffffff;
            color: #000000;
          }
        }
      }
      .tHead {
        position: sticky;
        top: 0;
        background: #0c0c0c;
      }
    }
  }
`;
interface MovieIT {
  _id: "";
  title: "";
  rating: 0;
  year: "";
  genre: "";
  time: "";
  actors: "";
  synopsis: "";
  link: "";
  image: "";
}
type Movies = [MovieIT];
const Search = () => {
  const [state, setState] = useState<Movies>();
  console.log(state);
  const fetchData = () => {
    axios
      .get(`${URI}/book`)
      .then(function (response: any) {
        setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
        // history.push(`/admin/login`);
      });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SearchSt>
      <div className="table">
        <div className="tRow tHead">
          <div className="cell head">Nombre</div>
          <div className="cell head">Año</div>
          <div className="cell head">Duración</div>
          <div className="cell head none">Actores</div>
          <div className="cell head">Género</div>
          <div className="cell head none">Sinposis</div>
          <div className="cell head none">Calificación</div>
          {/* <div className="cell head none">Imagen</div> */}
          <div className="cell head none">Link</div>
          <div className="cell head">Editar</div>
          <div className="cell head">Borrar</div>
        </div>
        {state?.map((i) => (
          <div className="tRow" key={i._id}>
            <div className="cell ">{i.title}</div>
            <div className="cell ">{i.year}</div>
            <div className="cell ">{i.time}</div>
            <div className="cell  none">{i.actors}</div>
            <div className="cell ">{i.genre}</div>
            <div className="cell  none">{i.synopsis}</div>
            <div className="cell  none">{i.rating}</div>
            {/* <div className="cell  none">{i.image}</div> */}
            <div className="cell  none">{i.link}</div>
            <div className="cell ">Editar</div>
            <div className="cell ">Borrar</div>
          </div>
        ))}
      </div>
      <Link className="addMedia" to="/media/add-media">
        +
      </Link>
    </SearchSt>
  );
};

export default Search;
