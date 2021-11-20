import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URI } from "config/axios";
import { StoreInterface } from "interfaces/storeTemplate";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loginServer } from "redux/actions/appAction";
import { BUCKET } from "config/bucket";
import { Link } from "react-router-dom";

const SearchSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;

    .poster {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: center;
      img {
        width: 90%;
        height: 100%;
        align-items: center;
        object-fit: contain;
      }
    }
    .data-right {
      width: 75%;
      height: 100%;
      overflow-y: scroll;
      .title {
        text-align: center;
        color: white;
        font-family: "Roboto 900";
        font-size: 3rem;
        text-transform: capitalize;
        /* background: red; */
        margin-bottom: 2rem;
      }
      .upload-form {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        // ! Estilos para la zona de title
        .container-inputs {
          width: 100%;
          height: 3rem;
          display: grid;
          grid-template-columns: 15% 15% 25% calc(25% - 5rem) 10% 10%;
          grid-template-rows: 100%;
          gap: 1rem;
          justify-content: center;
          align-content: center;
          margin-bottom: 2rem;
          .input-form-container {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            border: 0.0625rem solid #5901e7;
            border-radius: 0 0.3rem 0.3rem 0.3rem;
            .label {
              background: #5901e7;
              border-radius: 0.3rem 0.3rem 0 0;
              position: absolute;
              left: -0.0625rem;
              top: -1.3rem;
              font-family: "Roboto 300";
              font-size: 1rem;
              color: #ffffff;
              padding: 0 0.5rem;
            }
            .input-form {
              width: 100%;
              height: 100%;
              border-style: none;
              outline: none;
              padding: 0 1rem;
              background: none;
              color: white;
              font-family: "Roboto 300";
              font-size: 1rem;
            }
            .select {
              width: 90%;
              height: 100%;
              /* background: red; */
              option {
                color: #000000;
              }
            }
          }
        }
        .input-form-container-l {
          width: 100%;
          height: 3rem;
          position: relative;
          border-radius: 0 0.3rem 0.3rem 0.3rem;
          border: 0.0625rem solid #5901e7;
          margin-bottom: 2rem;
          .label {
            background: #5901e7;
            border-radius: 0.3rem 0.3rem 0 0;
            position: absolute;
            left: -0.0625rem;
            top: -1.2rem;
            font-family: "Roboto 300";
            font-size: 1rem;
            color: #ffffff;
            padding: 0 0.5rem;
          }
          .inputs-l {
            justify-self: center;
            align-self: center;
            width: 100%;
            height: 100%;
            border-style: none;
            outline: none;
            padding: 1rem 1rem;
            margin-bottom: 0.5rem;
            background: none;
            color: white;
            font-family: "Roboto 300";
            font-size: 1rem;
          }
        }

        .text-area {
          height: 8rem;
          .inputs-l {
            resize: none;
          }
        }
        .container-inputs02 {
          /* background: #bdb0b0; */
          width: 100%;
          height: 4rem;
          display: grid;
          grid-template-columns: 7.5% 22.5% calc(45% - 4rem) 15% 10%;
          grid-template-rows: 100%;
          gap: 1rem;
          justify-content: center;
          align-content: center;
          margin-bottom: 2rem;
          .input-form-container {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            border: 0.0625rem solid #5901e7;
            border-radius: 0 0.3rem 0.3rem 0.3rem;
            .label {
              background: #5901e7;
              border-radius: 0.3rem 0.3rem 0 0;
              position: absolute;
              left: -0.0625rem;
              top: -1.2rem;
              font-family: "Roboto 300";
              font-size: 1rem;
              color: #ffffff;
              padding: 0 0.5rem;
            }
            .input-form {
              justify-self: center;
              align-self: center;
              width: 100%;
              height: 100%;
              border-style: none;
              outline: none;
              padding: 0 1rem;
              border-radius: 0.3rem;
              background: none;
              color: white;
              font-family: "Roboto 300";
              font-size: 1rem;
              line-height: 4rem;
            }
            .select {
              width: 90%;
              height: 100%;
              /* background: red; */
              option {
                color: #000000;
              }
            }
          }
        }
        .save-btn {
          /* width: 15rem;
        height: 4rem; */

          border-style: none;
          outline: none;
          padding: 0.5rem 2rem;
          border-radius: 0.3rem;
          font-family: "Roboto 900";
          font-size: 2rem;
          /* line-height: 4rem; */
          cursor: pointer;
          transition: 0.1s;
          background: #5901e7;
          color: white;
          text-decoration: none;
          margin-left: 1rem;
          margin-right: 1rem;

          &:hover {
            transition: 0.1s;
            background: #ffffff;
            color: #000000;
          }
        }
      }
    }
  }
`;
const Search = () => {
  const fileRef = useRef<any>();
  const params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);
  const [id, setId] = useState<any>("");
  const [imageXL, setImageXL] = useState<any>("");
  const [imageL, setImageL] = useState<any>("");
  const [imageM, setImageM] = useState<any>("");
  const [imageS, setImageS] = useState<any>("");

  const [language, setLanguage] = useState("latino");
  const [folder, setFolder] = useState("estrenos");
  const [file, setFile] = useState<any>();
  const [title, setTitle] = useState<any>("");
  const [originalTitle, setOriginalTitle] = useState<any>("");
  const [rating, setRating] = useState<any>(0);
  const [year, setYear] = useState<any>("");
  const [genre, setGenre] = useState<any>("");
  const [time, setTime] = useState<any>("");
  const [actors, setActors] = useState<any>("");
  const [synopsis, setSynopsis] = useState<any>("");
  const [link, setLink] = useState<any>("");
  const [server, setServer] = useState<any>("mediafire");
  const [available, setAvailable] = useState<any>(true);
  console.log(language);

  // const [alertImg, setAlertImg] = useState<any>(false);
  // !Handle Change file
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.files?.[0];
    // if (value && value.size > 1048576) {
    //   // setAlertImg(true);
    // } else {
    //   setFile(value);
    // }
    setFile(value);
  };
  // !Handle Change inputs
  const handleLatino = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value;
    setLanguage(value);
  };
  const handleFolder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value;
    setFolder(value);
  };
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setTitle(value);
  };
  const handleOriginalTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setOriginalTitle(value);
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
  const handleServer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value;
    setServer(value);
  };
  const handleAvailable = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value === "true" ? true : false;
    setAvailable(value);
  };
  // !Handle Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("language", language);
    formData.append("folder", folder);
    formData.append("title", title);
    formData.append("originalTitle", originalTitle);
    formData.append("rating", rating);
    formData.append("year", year);
    formData.append("genre", genre);
    formData.append("time", time);
    formData.append("actors", actors);
    formData.append("synopsis", synopsis);
    formData.append("link", link);
    formData.append("file", file);
    formData.append("imageXL", imageXL);
    formData.append("imageL", imageL);
    formData.append("imageM", imageM);
    formData.append("imageS", imageS);
    formData.append("_id", id);
    formData.append("server", server);
    formData.append("available", available);

    // console.log("put client");

    await axios
      .put(`${URI}/movies/${params.id}`, formData, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.statusText === "OK") {
          navigate("/admin/media");
          // fetchData();
        }
      });
  };
  const fetchData = async () => {
    axios
      .get(`${URI}/movies/${params.id}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response) {
        //TODO Por cada nuevo dato seteado, se renderiza de nuevo. fixear!!!
        setLanguage(response.data.language);
        setFolder(response.data.Folder);
        setTitle(response.data.title);
        setOriginalTitle(response.data.originalTitle);
        setRating(response.data.rating);
        setYear(response.data.year);
        setGenre(response.data.genre);
        setTime(response.data.time);
        setActors(response.data.actors);
        setSynopsis(response.data.synopsis);
        setLink(response.data.link);
        setImageXL(response.data.imageXL);
        setImageL(response.data.imageL);
        setImageM(response.data.imageM);
        setImageS(response.data.imageS);
        setId(response.data._id);
        setServer(response.data.server);
        setAvailable(response.data.available);
        // console.log(response);
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
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
  // console.log(imageLink);
  // console.log(file);
  // console.log(file && `${BUCKET}${file}`);

  return (
    <SearchSt>
      <div className="poster">
        <img src={imageL && `${BUCKET}${imageL}`} alt="" />
      </div>
      <div className="data-right">
        <h2 className="title">Actualizar peliculas</h2>
        {/* {  // TODO: no se actualiza la carpeta} */}
        <form className="upload-form" onSubmit={handleSubmit}>
          <section className="container-inputs">
            <div className="input-form-container">
              <span className="label">Idioma:</span>
              <select
                value={language}
                className="input-form select"
                name="server"
                onChange={(e) => handleLatino(e)}
              >
                <option value="latino">Latino</option>
                <option value="subtitulado">Subtitulado</option>
              </select>
            </div>
            <div className="input-form-container">
              <span className="label">Carpeta:</span>
              <select
                value={folder}
                className="input-form select"
                name="server"
                onChange={(e) => handleFolder(e)}
              >
                <option value="estrenos">Estrenos</option>
                <option value="accion">Acción</option>
                <option value="comedia">Comedia</option>
                <option value="terror">Terror</option>
                <option value="animacion">Animación</option>
                <option value="drama">Drama</option>
                <option value="romance">Romance</option>
                <option value="sci-fi">Ciencia Ficción</option>
              </select>
            </div>
            <div className="input-form-container">
              <span className="label">Título:</span>
              <input
                name="title"
                className="input-form"
                type="text"
                onChange={(e) => handleTitle(e)}
                placeholder="Título"
                value={title}
              />
            </div>
            <div className="input-form-container">
              <span className="label">Título original:</span>
              <input
                name="originalTitle"
                className="input-form"
                type="text"
                onChange={(e) => handleOriginalTitle(e)}
                placeholder="Título original"
                value={originalTitle}
              />
            </div>
            <div className="input-form-container">
              <span className="label">Año:</span>
              <input
                name="year"
                className="input-form"
                type="text"
                onChange={(e) => handleYear(e)}
                placeholder="Año"
                value={year}
              />
            </div>
            <div className="input-form-container">
              <span className="label">Duración:</span>
              <input
                name="time"
                className="input-form"
                type="text"
                onChange={(e) => handleTime(e)}
                placeholder="Duración"
                value={time}
              />
            </div>
          </section>
          <div className="input-form-container-l">
            <span className="label">Reparto:</span>
            <input
              name="actors"
              className="inputs-l"
              type="text"
              onChange={(e) => handleActors(e)}
              placeholder="Reparto"
              value={actors}
            />
          </div>
          <div className="input-form-container-l">
            <span className="label">Género:</span>
            <input
              name="genre"
              className="inputs-l"
              type="text"
              onChange={(e) => handleGenre(e)}
              placeholder="Género"
              value={genre}
            />
          </div>
          <div className="input-form-container-l text-area">
            <span className="label">Sinopsis:</span>
            <textarea
              name="synopsis"
              className="inputs-l text-area"
              onChange={(e) => handleSynopsis(e)}
              placeholder="Sinopsis"
              value={synopsis}
            ></textarea>
          </div>
          <section className="container-inputs02">
            <div className="input-form-container">
              <span className="label">Rating:</span>
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
            </div>
            <div className="input-form-container">
              <span className="label">Poster:</span>
              <input
                ref={fileRef}
                name="file"
                className="input-form "
                type="file"
                onChange={(e) => handleChange(e)}
                placeholder="File"
                accept="image/*"
              />
            </div>
            <div className="input-form-container">
              <span className="label">Link de la película mp4:</span>
              <input
                name="link"
                className="input-form"
                type="text"
                onChange={(e) => handleLink(e)}
                placeholder="Link de la película."
                value={link}
              />
            </div>
            <div className="input-form-container">
              <span className="label">Servidor:</span>
              <select
                value={server}
                className="input-form select"
                name="server"
                onChange={(e) => handleServer(e)}
              >
                <option value="mediafire">Mediafire</option>
                <option value="backblaze">Backblaze</option>
              </select>
            </div>
            <div className="input-form-container">
              <span className="label">Disponible:</span>
              <select
                value={available}
                className="input-form select"
                name="server"
                onChange={(e) => handleAvailable(e)}
              >
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </div>
          </section>
          <div>
            <button className="save-btn">Guardar</button>
            <Link to="/admin/media" className="save-btn">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </SearchSt>
  );
};

export default Search;
