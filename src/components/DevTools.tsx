import { Link } from "react-router-dom";
import styled from "styled-components";
const DevToolsSt = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  h1 {
    font-family: "Roboto 900", sans-serif;
    font-weight: 900;
    font-size: 2rem;
    text-align: center;
  }
  .btnSubmit {
    text-align: center;
    text-decoration: none;
    font-family: "Roboto 900";
    font-size: 1rem;
    outline: none;
    padding: 1rem;
    border-style: none;
    border-radius: 0.3rem;
    cursor: pointer;
    background: #5100ff;
    color: white;
    transition: 0.1s;
    margin-top: 2rem;
    &:hover {
      background: white;
      color: #000000;
      transition: 0.1s;
    }
  }
  // !Estilos para DESKTOP
  @media only screen and (min-width: 568px) {
    h1 {
      font-size: 6rem;
    }
    .btnSubmit {
      font-size: 2rem;
    }
  }
`;
const DevTools = () => {
  return (
    <DevToolsSt>
      <h1>Ups. Hubo un error!</h1>
      <Link className="btnSubmit" to="/browser">
        Intentar de nuevo
      </Link>
    </DevToolsSt>
  );
};

export default DevTools;
