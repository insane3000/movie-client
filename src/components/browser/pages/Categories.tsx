import { Link } from "react-router-dom";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Genre from "./Genre";
const CategoriesSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: auto;

    .list-categories {
      width: 100%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 20rem));
      /* grid-template-columns: 18rem 18rem 18rem 18rem; */
      grid-auto-rows: 12rem;
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
        background: #181717;
        background: #78777c2f;

        &:hover {
          transform: scale(1.1);
          transition: 0.1s;
          background: #eeeaea;
          .text {
            color: black;
          }
        }
        .text {
          font-family: "Roboto 100";
          font-size: 1.5rem;
          color: white;
          /* text-shadow: 1px 1px 1px #47474771; */
        }
      }
    }
  }
`;
const Categories = () => {
  const color = [
    { to: "acci", name: "Acción" },
    { to: "comedia", name: "Comedia" },
    { to: "terror", name: "Terror" },
    { to: "animaci", name: "Animación" },
    { to: "drama", name: "Drama" },
    { to: "romance", name: "Romance" },
    { to: "cienc", name: "Cienca Ficción" },
  ];

  return (
    <CategoriesSt>
      <Routes>
        <Route
          path="/"
          element={
            <section className="list-categories">
              {color.map((i) => (
                <Link
                  className="category"
                  to={`/browser/category/${i.to}`}
                  key={i.name}
                  // style={{ background: `#${i.color}` }}
                >
                  <span className="text">{i.name}</span>
                </Link>
              ))}
            </section>
          }
        />
        <Route path="/:genre" element={<Genre />} />
      </Routes>
    </CategoriesSt>
  );
};

export default Categories;
