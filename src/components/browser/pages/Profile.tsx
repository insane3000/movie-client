import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
// *Icons
import UserIconLight from "icons/UserIconLight";
import { StoreInterface } from "interfaces/storeTemplate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginServer } from "redux/actions/appAction";
const UpdateUserSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  .userContainer {
    /* background: #0c0c0c; */
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    margin-top: 3rem;
    .sysIconUser {
      background: #5901e7;
      width: 5rem;
      height: 5rem;
      margin-bottom: 2rem;
      border-radius: 100%;
      padding: 1rem;
    }
    .section {
      width: 80%;
      height: 3rem;
      position: relative;
      margin-bottom: 2rem;
      border: 0.0625rem solid #5901e7;
      border-radius: 0.3rem;
      .label {
        height: 1rem;
        position: absolute;
        top: -1.2rem;
        font-family: "Roboto 300";
        font-size: 0.9rem;
        color: #b9b9b9;
      }
      .data {
        width: 100%;
        height: 100%;
        line-height: 3rem;
        padding: 0 0.5rem;
        font-family: "Roboto 900";
        font-size: 1.5rem;
      }
      .name {
        text-transform: capitalize;
      }
      .date {
        font-family: "Roboto 300";
        font-size: 1rem;
      }
    }
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    .userContainer {
      background: #0c0c0c;
      width: 25rem;
      height: 33rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      margin-top: 3rem;
      .sysIconUser {
        background: #5901e7;
        width: 5rem;
        height: 5rem;
        margin-bottom: 2rem;
        border-radius: 100%;
        padding: 1rem;
      }
      .section {
        width: 80%;
        height: 3rem;
        position: relative;
        margin-bottom: 2rem;
        border: 0.0625rem solid #5901e7;
        border-radius: 0.3rem;
        .label {
          height: 1rem;
          position: absolute;
          top: -1.2rem;
          font-family: "Roboto 300";
          font-size: 0.9rem;
          color: #b9b9b9;
        }
        .data {
          width: 100%;
          height: 100%;
          line-height: 3rem;
          padding: 0 0.5rem;
          font-family: "Roboto 900";
          font-size: 1.5rem;
        }
        .name {
          text-transform: capitalize;
        }
        .date {
          font-family: "Roboto 300";
          font-size: 1rem;
        }
      }
    }
  }
`;
interface User {
  user: string;
  password: string;
  name: string;
  phone: string;
  date: string;
  role: string;
}
const UpdateUser = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const app = useSelector((store: StoreInterface) => store.app);

  const [state, setState] = useState<User>({
    user: "",
    password: "",
    name: "",
    phone: "",
    date: "",
    role: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/client/${app.login.user}`, {
          headers: {
            authorization: `Bearer ${app.login.token}`,
            id: `${app.login.user}`,
            role: `${app.login.role}`,
          },
        })
        .then(function (response) {
          setState(() => ({
            ...state,
            user: response.data.user,
            password: response.data.password,
            name: response.data.name,
            phone: response.data.phone,
            date: response.data.date,
          }));
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          dispatch(loginServer("", "", ""));
          localStorage.setItem("token", "");
          localStorage.setItem("user", "");
          localStorage.setItem("role", "");
          navigate(`/`);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return (
    <UpdateUserSt>
      <div className="userContainer">
        <UserIconLight className="sysIconUser" />
        <section className="section">
          <span className="label">Clave:</span>
          <span className="data">{state.user.toUpperCase().slice(0, 2)}••••••</span>
        </section>
        <section className="section">
          <span className="label">Nombre:</span>
          <span className="data name">{state.name}</span>
        </section>
        <section className="section">
          <span className="label">Celular:</span>
          <span className="data">{state.phone}</span>
        </section>
        <section className="section">
          <span className="label">Fecha de vencimiento:</span>
          <span className="data date">
            {new Date(state.date).toLocaleDateString("es-ES", options)}
          </span>
        </section>
      </div>
    </UpdateUserSt>
  );
};

export default UpdateUser;
