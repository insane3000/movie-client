import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const CategoriesSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 15rem));
    /* grid-template-columns: 18rem 18rem 18rem 18rem; */
    grid-auto-rows: 10rem;
    justify-content: center;
    align-content: flex-start;
    padding: 5rem 5rem;
    gap: 1rem;

    .category {
      border-radius: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      transition: 0.1s;
      &:hover {
        transform: scale(1.1);
        transition: 0.1s;
      }
      .text {
        font-family: "Roboto 900";
        font-size: 1.5rem;
        color: white;
        text-shadow: 1px 1px 5px #47474771;
      }
    }
  }
`;
const Categories = () => {
  const color = [
    { color: "F72585", to: "acci", name: "Accion" },
    { color: "B5179E", to: "comedia", name: "Comedia" },
    { color: "7209B7", to: "terror", name: "Terror" },
    { color: "560BAD", to: "animaci", name: "Animacion" },
    { color: "480CA8", to: "crimen", name: "Crimen" },
    { color: "3A0CA3", to: "documental", name: "Documental" },
    { color: "3F37C9", to: "drama", name: "Drama" },
    { color: "4361EE", to: "music", name: "Music" },
    { color: "4895EF", to: "romance", name: "Romance" },
    { color: "4CC9F0", to: "ciencia", name: "Cienca Ficcion" },
  ];

  return (
    <CategoriesSt>
      {color.map((i) => (
        <Link
          className="category"
          to={`/genre/${i.to}`}
          key={i.color}
          style={{ background: `#${i.color}` }}
        >
          <h4 className="text">{i.name}</h4>
        </Link>
      ))}
    </CategoriesSt>
  );
};

export default Categories;
