import axios from "axios";
import { URI } from "config/axios";
import { StoreInterface } from "interfaces/storeTemplate";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { loginServer } from "redux/actions/appAction";
// *Icons
import EditIcon from "icons/EditIcon";
import DeleteIcon from "icons/DeleteIcon";
const MediaSt = styled.div`
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
      background: #22212155;
      position: absolute;
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
        background: #5901e7;
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
      overflow-y: scroll;
      position: relative;
      .tRow {
        display: grid;
        grid-template-columns: calc(25% - 1.5rem) 15% 10% 10% 10% 10% 10% 10%;
        grid-template-rows: 100%;
        column-gap: 0.2rem;
        justify-content: center;
        align-content: center;
        &:hover {
          .cell {
            background: #1c1c1d;
          }
          .head {
            background: #000000;
          }
          .action-btn {
            background: #5901e7;
          }
        }
        .cell {
          background: #141414;
          line-height: 2rem;
          display: block;
          border-radius: 0.3rem;
          font-family: "Roboto 300";
          font-size: 1rem;
          color: white;
          padding: 0 1rem;
          // Dots ...
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .head {
          background: #000000;
          font-family: "Roboto 900";
          font-size: 1rem;
          text-align: center;
          color: #ffffff;
        }

        .action-btn {
          background: #5901e7;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.1rem;
          &:hover {
            background: #ffffff;
            color: #000000;
          }
        }
        .center {
          text-align: center;
          text-transform: capitalize;
        }
        .none {
          display: block;
        }
      }
      //! Para mantener pegado los titulos
      .sticky-top {
        position: sticky;
        top: 0;
        background: #0d0d0e;
      }
    }
  }
`;
interface MovieIT {
  _id: "";
  language: "";
  folder: "";
  title: "";
  originalTitle: "";
  rating: 0;
  year: "";
  genre: "";
  time: "";
  actors: "";
  synopsis: "";
  link: "";
  image: "";
  server: "";
  available: "";
}
type Movies = [MovieIT];
const Search = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  const [state, setState] = useState<Movies>();
  let [totalPages, setTotalPages] = useState(1);
  let [page, setPage] = useState(1);

  // !Handle Pagination
  const handlePrevious = () => {
    page > 1 && setPage((page -= 1));
  };
  const handleNext = () => {
    page <= totalPages - 1 && setPage((page += 1));
  };
  // console.log(totalPages);
  // console.log(page);
  // console.log(state);
  // !Delete Movie
  const handleDelete = async (id: string) => {
    await axios
      .delete(`${URI}/movies/${id}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(() => {
        fetchData();
      });
  };
  const fetchData = () => {
    axios
      .get(`${URI}/movies-admin?page=${page}&limit=20`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response: any) {
        setState(response.data.docs);
        setTotalPages(response.data.totalPages);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        // history.push(`/admin/login`);
        dispatch(loginServer("", "", ""));
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        localStorage.setItem("role", "");
        navigate(`/`);
      });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <MediaSt>
      <div className="table">
        <div className="tRow sticky-top">
          <div className="cell head">Título</div>
          <div className="cell head">Idioma</div>
          <div className="cell head">Carpeta</div>
          <div className="cell head">Año</div>
          <div className="cell head">Servidor</div>
          <div className="cell head">Disponible</div>
          <div className="cell head">Editar</div>
          <div className="cell head">Borrar</div>
        </div>
        {state?.map((i) => (
          <div className="tRow" key={i._id}>
            <div className="cell ">{i.title}</div>
            <div className="cell ">{i.language}</div>
            <div className="cell ">{i.folder}</div>
            <div className="cell center">{i.year}</div>
            <div
              className="cell center"
              style={`${i.server}` === "mediafire" ? { color: "#00ffbf" } : { color: "#ff0055" }}
            >
              {i.server}
            </div>
            <div className="cell center" style={i.available ? { color: "lime" } : { color: "red" }}>
              {i.available ? "Si" : "No"}
            </div>
            <Link className="cell action-btn " to={`/admin/update-media/${i._id}`}>
              <EditIcon />
            </Link>
            <div className="cell action-btn" onClick={() => handleDelete(i._id)}>
              <DeleteIcon />
            </div>
          </div>
        ))}
      </div>
      <Link className="addMedia" to="/admin/add-media">
        +
      </Link>
      <button onClick={handlePrevious}>Pagina Anterior</button>
      <button onClick={handleNext}>Pagina Siguiente</button>
    </MediaSt>
  );
};

export default Search;
