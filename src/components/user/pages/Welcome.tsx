// import { StoreInterface } from "interfaces/storeTemplate";
// import { useEffect } from "react";
// import { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { restartScroll } from "redux/actions/appAction";
// import Cluster from "../organisms/Cluster";

import axios from "axios";
import { URI } from "config/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginServer } from "redux/actions/appAction";
import styled from "styled-components";
const WelcomeSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  overflow-y: scroll;
  overflow-x: hidden;
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    /* margin-top: 3rem; */
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-top: 2rem;
    .titleWelcome {
      font-family: "Roboto 900";
      font-size: 4rem;
      margin-bottom: 0rem;
      color: #5900ff;
    }
    .titleCode {
      font-family: "Roboto 100";
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .containerActivationCode {
      width: 100%;
      height: 25rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /* background: red; */
      .activationCode {
        width: 100%;
        height: auto;
        /* background: lime; */
        display: grid;
        grid-template-columns: repeat(5, 12rem);
        grid-template-rows: 15rem;
        gap: 1rem;
        justify-content: center;
        align-content: flex-start;
        margin-bottom: 2rem;
        .cell {
          font-family: "Roboto 900";
          font-size: 10rem;
          text-align: center;
          text-transform: uppercase;
          background: none;
          color: #ffffff;
          border-radius: 0.5rem;
          border: 0.125rem solid #ff0040;
          outline: none;
        }
        .word0 {
          color: #00a2ff;
        }
        .word1 {
          color: #5100ff;
        }
        .word2 {
          color: #c300ff;
        }
        .word3 {
          color: #ff0062;
        }
        .word4 {
          color: #ff9d00;
        }
      }
      .btnSubmit {
        width: 15rem;
        height: 4rem;
        font-family: "Roboto 900";
        font-size: 2rem;
        outline: none;
        border-style: none;
        border-radius: 0.3rem;
        cursor: pointer;
        background: #5100ff;
        color: white;
        transition: 0.1s;

        &:hover {
          background: white;
          color: #000000;
          transition: 0.1s;
        }
      }
    }
  }
`;
interface State {
  word0: string;
  word1: string;
  word2: string;
  word3: string;
  word4: string;
}
const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState<State>({
    word0: "",
    word1: "",
    word2: "",
    word3: "",
    word4: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toLowerCase();
    let name = e.target.name;
    setState({
      ...state,
      [name]: value,
    });
  };
  let user =
    state.word0 + state.word1 + state.word2 + state.word3 + state.word4;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setSpinner(true);
    // console.log(user);
    await axios
      .post(`${URI}/login-user`, { user })
      .then(function (response) {
        dispatch(loginServer(response.data._id, response.data.token, response.data.role));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data._id);
        localStorage.setItem("role", response.data.role);
        navigate(`/home`);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        // setSpinner(false);
        // setErrorUser(true);
      });
  };

  return (
    <WelcomeSt>
      <h2 className="titleWelcome">Bienvenido a Movie Store Cbba</h2>
      <span className="titleCode">Inserta tu codigo de activación.</span>
      <form
        className="containerActivationCode"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="activationCode">
          <input
            name="word0"
            className="cell word0"
            type="text"
            value={state.word0}
            maxLength={1}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            required
          />
          <input
            name="word1"
            className="cell word1"
            type="text"
            value={state.word1}
            maxLength={1}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            required
          />
          <input
            name="word2"
            className="cell word2"
            type="text"
            value={state.word2}
            maxLength={1}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            required
          />
          <input
            name="word3"
            className="cell word3"
            type="text"
            value={state.word3}
            maxLength={1}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            required
          />
          <input
            name="word4"
            className="cell word4"
            type="text"
            value={state.word4}
            maxLength={1}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            required
          />
        </div>
        <input className="btnSubmit" type="submit" value="Entrar" />
      </form>
    </WelcomeSt>
  );
};

export default Welcome;
