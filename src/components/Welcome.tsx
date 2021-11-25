import axios from "axios";
import { URI } from "config/axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginServer } from "redux/actions/appAction";
import styled from "styled-components";
import Spinner05 from "components/browser/atoms/Spinner05";
import Countdown from "react-countdown";

const WelcomeSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;
const LoginSt = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .titleWelcome {
    font-family: "Roboto 900";
    font-size: 4rem;
    margin-top: 2rem;
    color: #5900ff;
  }
  .titleCode {
    font-family: "Roboto 100";
    font-size: 3rem;
    margin-bottom: 1rem;
    color: white;
  }
  .formActivationCode {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .cell-input {
      width: 65rem;
      height: 15rem;
      font-family: "Roboto 900";
      font-size: 10rem;
      text-align: center;
      text-transform: uppercase;
      background: none;
      border-radius: 0.5rem;
      border: 0.125rem solid #ff0040;
      outline: none;
      letter-spacing: 2rem;
      padding: 0 4rem;
      margin-bottom: 2rem;
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
`;
const LoaderSt = styled.div`
  width: 100%;
  height: 100%;
  background: #05010e;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BlockUserSt = styled.div`
  width: 100%;
  height: 100%;
  background: #05010e;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  color: white;
  position: absolute;
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
`;
const AlertSt = styled.div`
  width: 100%;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  font-family: "Roboto 300";
  font-size: 1rem;
  margin-bottom: 2rem;
  color: red;
`;
const Welcome = () => {
  const codeInput = useRef<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [numberFails, setNumberFails] = useState<number>(0);
  const [blockUser, setblockUser] = useState(false);
  //   console.log(numberFails);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toLowerCase();
    setState(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSpinner(true);
    e.preventDefault();
    await axios
      .post(`${URI}/login-user`, { user: state })
      .then(function (response) {
        dispatch(loginServer(response.data._id, response.data.token, response.data.role));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data._id);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("fails", "0");
        navigate(`/browser`);
      })
      .catch(function (error) {
        setSpinner(false);

        setNumberFails(numberFails + 1);
        setState("");
        codeInput.current.focus();
        localStorage.setItem("fails", `${numberFails + 1}`);
        numberFails >= 2 && localStorage.setItem("lastFail", `${Date.now() + 10 * 1000}`);
        numberFails >= 2 && setblockUser(true);
      });
  };
//   console.log(numberFails);
  useEffect(() => {
    codeInput.current.focus();

    if (Math.round(parseInt(`${localStorage.getItem("lastFail")}`) - Date.now()) < 0) {
      localStorage.setItem("lastFail", "0");
    }
    if (parseInt(`${localStorage.getItem("fails")}`) >= 3) {
      localStorage.setItem("fails", "0");
    }
    setNumberFails(
      localStorage.getItem("fails") === null
        ? 0
        : // : Math.round(parseInt(`${localStorage.getItem("lastFail")}`) - Date.now()) >= 0
        parseInt(`${localStorage.getItem("lastFail")}`) === 1
        ? 0
        : parseInt(`${localStorage.getItem("fails")}`)
    );
    setblockUser(
      localStorage.getItem("lastFail") === null
        ? false
        : localStorage.getItem("lastFail") === "0"
        ? false
        : Math.round(parseInt(`${localStorage.getItem("lastFail")}`) - Date.now()) >= 0
        ? true
        : false
    );
  }, []);

  // ! Blockeando Usuario
  const lastFail =
    localStorage.getItem("lastFail") === null
      ? 1000
      : Math.round(parseInt(`${localStorage.getItem("lastFail")}`) - Date.now());

  //   console.log(Math.round(parseInt(`${localStorage.getItem("lastFail")}`) - Date.now()));

  // !Componente btn lanzado al terminar el conteo
  const Completionist = () => {
    const handleNavigate = () => {
      setNumberFails(0);
      setblockUser(false);
      setState("");
      codeInput.current.focus();
    };
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
    <WelcomeSt>
      <LoginSt>
        <h2 className="titleWelcome">Bienvenido a Movie Store Cbba</h2>
        <span className="titleCode">Inserta tu clave de activación.</span>
        <form className="formActivationCode" onSubmit={(e) => handleSubmit(e)}>
          <div className="activationCode">
            <input
              ref={codeInput}
              name="word0"
              className="cell-input word4"
              type="text"
              value={state}
              maxLength={6}
              onChange={handleChange}
              //     onFocus={(e) => e.target.select()}
              required
            />
          </div>

          {numberFails >= 1 && (
            <AlertSt>Los datos son incorectos. Te quedan {3 - numberFails} intentos.</AlertSt>
          )}

          <input className="btnSubmit" type="submit" value="Entrar" />
        </form>
      </LoginSt>
      {blockUser && (
        <BlockUserSt>
          <h1 className="title-block">Usuario Bloqueado</h1>
          <Countdown date={Date.now() + lastFail} renderer={renderer} />
        </BlockUserSt>
      )}
      {spinner && (
        <LoaderSt>
          <Spinner05 />
        </LoaderSt>
      )}
    </WelcomeSt>
  );
};

export default Welcome;
