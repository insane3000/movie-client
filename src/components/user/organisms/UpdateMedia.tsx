import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URI } from "config/axios";
import { StoreInterface } from "interfaces/storeTemplate";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loginServer } from "redux/actions/appAction";

const SearchSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Roboto 900";
    font-size: 8rem;
    .title {
      text-transform: uppercase;
      font-family: "Roboto 900";
      font-size: 2rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    .upload-form {
      width: 100%;
      height: 100%;
      /* background: #0d0c13; */
      border-radius: 0.5rem;
      display: grid;
      grid-template-columns: 30% 30% 30%;
      grid-auto-rows: 5rem;
      justify-content: center;
      align-content: flex-start;
      margin-top: 3rem;

      .input-form {
        width: 80%;
        height: 3rem;
        line-height: 3rem;
        margin-bottom: 1rem;
        padding: 0 0.5rem;
        font-family: "Roboto 300";
        font-size: 1rem;
        border-radius: 0.3rem;
        outline: none;
        border-style: none;
        background: none;
        border: 0.0625rem solid #ff002b;
        color: white;
      }
      .textArea {
        /* background: red; */
        /* padding: 0.5rem 0.5rem;
        height: 8rem;
        line-height: 1rem; */
        resize: none;
      }
      .alert {
        width: 80%;
        color: red;
        font-family: "Roboto 300";
        font-size: 1rem;
      }
      .uploadBtn {
        font-family: "Roboto 900";
        font-size: 1.5rem;
        background: #ff002b;
        cursor: pointer;
        &:hover {
          background: #ffffff;
          color: black;
          border: 0.0625rem solid #000000;
        }
      }
      .fakeBtn {
        border: 0.0625rem solid #1b0408;
        font-family: "Roboto 900";
        font-size: 1.5rem;
        background: #1b0408;
        cursor: not-allowed;
        user-select: none;
        text-align: center;
      }
    }
  }
`;
const Search = () => {
  const params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);
  const [file, setFile] = useState<any>();
  const [title, setTitle] = useState<any>("");
  const [titleEsp, setTitleEsp] = useState<any>("");
  const [rating, setRating] = useState<any>(0);
  const [year, setYear] = useState<any>("");
  const [genre, setGenre] = useState<any>("");
  const [time, setTime] = useState<any>("");
  const [actors, setActors] = useState<any>("");
  const [synopsis, setSynopsis] = useState<any>("");
  const [link, setLink] = useState<any>("");
  const [alertImg, setAlertImg] = useState<any>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.files?.[0];
    if (value && value.size > 1048576) {
      setAlertImg(true);
    } else {
      setFile(value);
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setTitle(value);
  };
  const handleTitleEsp = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setTitleEsp(value);
  };
  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setRating(value);
  };
  const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setYear(value);
  };
  const handleGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setGenre(value);
  };
  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setTime(value);
  };
  const handleActors = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setActors(value);
  };
  const handleSynopsis = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.currentTarget.value;
    setSynopsis(value);
  };
  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setLink(value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("title", title);
    formData.append("titleEsp", titleEsp);
    formData.append("rating", rating);
    formData.append("year", year);
    formData.append("genre", genre);
    formData.append("time", time);
    formData.append("actors", actors);
    formData.append("synopsis", synopsis);
    formData.append("link", link);
    formData.append("file", file);
    console.log("put client");
    console.log(formData)

    await axios
      .put(`${URI}/movies/${params.id}`, formData, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.statusText === "OK") {
          // navigate("/media");
        }
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${URI}/movies/${params.id}`, {
          headers: {
            authorization: `Bearer ${app.login.token}`,
          },
        })
        .then(function (response) {
          setTitle(response.data.title);
          setTitleEsp(response.data.titleEsp);
          setRating(response.data.rating);
          setYear(response.data.year);
          setGenre(response.data.genre);
          setTime(response.data.time);
          setActors(response.data.actors);
          setSynopsis(response.data.synopsis);
          setLink(response.data.link);
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
  return (
    <SearchSt>
      <h2 className="title">Actualizar peliculas</h2>

      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          name="title"
          className="input-form"
          type="text"
          onChange={(e) => handleTitle(e)}
          placeholder="Título original"
          value={title}
        />
        <input
          name="titleEsp"
          className="input-form"
          type="text"
          onChange={(e) => handleTitleEsp(e)}
          placeholder="Título español"
          value={titleEsp}
        />
        <input
          name="year"
          className="input-form"
          type="text"
          onChange={(e) => handleYear(e)}
          placeholder="Año"
          value={year}
        />
        <input
          name="time"
          className="input-form"
          type="text"
          onChange={(e) => handleTime(e)}
          placeholder="Duración"
          value={time}
        />
        <input
          name="actors"
          className="input-form"
          type="text"
          onChange={(e) => handleActors(e)}
          placeholder="Reparto"
          value={actors}
        />
        <input
          name="genre"
          className="input-form"
          type="text"
          onChange={(e) => handleGenre(e)}
          placeholder="Género"
          value={genre}
        />
        <textarea
          name="synopsis"
          className="input-form textArea"
          onChange={(e) => handleSynopsis(e)}
          placeholder="Sinopsis"
          value={synopsis}
        ></textarea>
        <input
          name="rating"
          className="input-form"
          type="number"
          onChange={(e) => handleRating(e)}
          placeholder="Rating"
          step="any"
          value={rating}
          onFocus={(e) => e.target.select()}
        />
        {alertImg && <span className="alert">El tamaño de la imagen es muy grande. Máximo admitido 1Mb.</span>}
        <input
          name="file"
          className="input-form "
          type="file"
          onChange={(e) => handleChange(e)}
          placeholder="File"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          // max-size="2000"
          // value={file}
        />
        <input
          name="link"
          className="input-form"
          type="text"
          onChange={(e) => handleLink(e)}
          placeholder="Link de la película."
          value={link}
        />
        {!alertImg ? (
          <button className="input-form uploadBtn">Guardar</button>
        ) : (
          <span className="input-form fakeBtn">Guardar</span>
        )}
      </form>
    </SearchSt>
  );
};

export default Search;
