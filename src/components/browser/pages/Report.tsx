import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { setModalReport } from "redux/actions/appAction";
import toast from "react-hot-toast";
const ReportSt = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #080808;

  .form-report {
    width: 100%;
    height: 100%;
    background: #050505;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* overflow-y: scroll; */

    .poster-title-report {
      width: 90%;
      height: 6rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      margin-top: 1rem;
      .poster-report {
        width: 4rem;
        height: 100%;
        border-radius: 0.3rem;
        overflow: hidden;
        .image-report {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .title-report {
        width: calc(100% - 4rem);
        color: white;
        font-family: "Roboto 900";
        font-size: 8vw;
        padding: 0 1rem;
        user-select: text;
      }
    }

    .info {
      width: 90%;
      height: 4rem;
      /* background: red; */
      color: #b4b4b4;
      font-family: "Roboto 300";
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    .text-area {
      width: 90%;
      height: calc(100% - 19rem);
      resize: none;
      background: #131212;
      border-style: none;
      outline: none;
      color: white;
      font-family: "Roboto 300";
      font-size: 0.9rem;
      padding: 1rem 1rem;
      border-radius: 0.3rem;
      margin-bottom: 1rem;
    }
    .buttons-cancel-submit {
      width: 90%;
      height: 3rem;
      /* background: lime; */
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .buttonsReport {
        background: #4400ff;
        width: 8rem;
        height: 3rem;
        border-radius: 0.3rem;
        outline: none;
        border-style: none;
        color: white;
        font-family: "Roboto 900";
        font-size: 1.2rem;
        cursor: pointer;
        &:hover {
          background: white;
          color: black;
        }
      }
    }
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #080808;

    .form-report {
      width: 30rem;
      height: 40rem;
      background: #050505;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .poster-title-report {
        width: 80%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
        .poster-report {
          width: 4rem;
          height: 100%;
          border-radius: 0.3rem;
          overflow: hidden;
          .image-report {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .title-report {
          width: calc(100% - 4rem);
          color: white;
          font-family: "Roboto 900";
          font-size: 2rem;
          padding: 0 1rem;
          user-select: text;
        }
      }

      .info {
        width: 80%;
        height: 2.5rem;
        /* background: red; */
        color: #b4b4b4;
        font-family: "Roboto 300";
        font-size: 0.9rem;
        margin-bottom: 1rem;
      }
      .text-area {
        width: 80%;
        height: calc(100% - 19rem);
        resize: none;
        background: #0c0c0c;
        border-style: none;
        outline: none;
        color: white;
        font-family: "Roboto 300";
        font-size: 0.9rem;
        padding: 1rem 1rem;
        border-radius: 0.3rem;
        margin-bottom: 1rem;
      }
      .buttons-cancel-submit {
        width: 80%;
        height: 3rem;
        /* background: lime; */
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .buttonsReport {
          background: #4400ff;
          width: 10rem;
          height: 3rem;
          border-radius: 0.3rem;
          outline: none;
          border-style: none;
          color: white;
          font-family: "Roboto 900";
          font-size: 1.2rem;
          cursor: pointer;
          &:hover {
            background: white;
            color: black;
          }
        }
      }
    }
  }
`;

const Report = () => {
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  const [state, setState] = useState({
    idMovie: "",
    title: "",
    imageS: "",
    imageL: "",
    message: "",
  });

  const handleCloseModal = () => {
    dispatch(setModalReport(false, "", "", "", "", ""));
    //     navigate(-1);
  };
  useEffect(() => {
    setState({
      idMovie: app.report.idMovie,
      title: app.report.title,
      imageS: app.report.imageS,
      imageL: app.report.imageL,
      message: app.report.message,
    });
  }, [
    app.report.idMovie,
    app.report.title,
    app.report.imageS,
    app.report.imageL,
    app.report.message,
  ]);
  //   console.log(state);
  //!Handle message
  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, message: e.target.value });
  };
  //!Handle SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/reports`, state, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function () {
        toast.success("Enviado.");
        handleCloseModal();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ReportSt>
      <form className="form-report" onSubmit={(e) => handleSubmit(e)}>
        <div className="poster-title-report ">
          <div className="poster-report">
            <img
              className="image-report"
              src={state.imageS && `${process.env.REACT_APP_BUCKET}${state.imageS}`}
              alt=""
            />
          </div>
          <h2 className="title-report">{state.title}</h2>
        </div>

        <span className="info">
          A continuación explica que esta mal con la película o serie. <br />
          Nos ayudas mucho si eres lo mas preciso/a posible. <br />
          {/* Los errores los corregiremos lo mas antes posible. <br />
          Recuerda que, esto solo sirve para notificar errores con el contenido, si quieres hacer un
          pedido, escribe directamente a la sucursal. */}
        </span>

        <textarea
          className="text-area"
          name="message"
          onChange={handleMessage}
          value={state.message}
        >
          {state.message}
        </textarea>
        <div className="buttons-cancel-submit">
          <button className="buttonsReport" type="button" onClick={handleCloseModal}>
            Cancelar
          </button>
          <button className="buttonsReport" type="submit">
            Enviar
          </button>
        </div>
      </form>
      {/* <div className="close-btn" onClick={handleCloseModal}>
        <IoCloseOutline className="sysIconClose" />
      </div> */}
    </ReportSt>
  );
};

export default Report;
