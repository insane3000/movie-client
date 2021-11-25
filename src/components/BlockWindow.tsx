import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router";
import styled from "styled-components";
const BlockWindowSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    color: white;
    .title-block {
      color: #5100ff;
      font-family: "Roboto 900";
      font-size: 5rem;
      margin-bottom: 2rem;
    }
    .counter {
      width: 50rem;
      height: 10rem;
      color: #ffffff;
      font-family: "Roboto 900";
      font-size: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      border: 0.125rem solid #ff0040;
    }
    .try-again {
      width: 20rem;
      height: 5rem;
      font-family: "Roboto 900";
      font-size: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      color: #ffffff;
      background: #ff0040;
      cursor: pointer;
      :hover {
        color: #000000;
        background: #ffffff;
      }
    }
  }
`;

const BlockWindow = () => {
  const lastFail =
    localStorage.getItem("lastFail") === null
      ? 60 * 1000 * 60
      : localStorage.getItem("lastFail") === "0"
      ? 60 * 1000 * 60
      : Math.round(parseInt(`${localStorage.getItem("lastFail")}`) - Date.now());
  console.log(lastFail);

  // !Componente btn lanzado al terminar el conteo
  const Completionist = () => {
    const navigate = useNavigate();
    const handleNavigate = () => navigate(`/`);
    return (
      <span className="try-again" onClick={handleNavigate}>
        Intentar de nuevo!
      </span>
    );
  };
  // !Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // !Render a completed state
      localStorage.setItem("fails", "0");
      localStorage.setItem("lastFail", "0");

      return <Completionist />;
    } else {
      // !Render a countdown
      return (
        <span className="counter">
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <BlockWindowSt>
      <h1 className="title-block">Tiempo restante para desbloqueo</h1>
      <Countdown date={Date.now() + lastFail} renderer={renderer} />
    </BlockWindowSt>
  );
};

export default BlockWindow;
