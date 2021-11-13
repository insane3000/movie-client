import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URI } from "config/axios";
import { StoreInterface } from "interfaces/storeTemplate";
import { useSelector } from "react-redux";
const SearchSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
      width: 80%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      .container-inputs {
        width: 100%;
        height: 3rem;
        display: grid;
        grid-template-columns: 40% calc(40% - 3rem) 10% 10%;
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
          border: 0.0625rem solid red;
          border-radius: 0 0.3rem 0.3rem 0.3rem;
          .label {
            background: #ff0033;
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
        }
      }
      .input-form-container-l {
        width: 100%;
        height: 3rem;
        position: relative;
        border-radius: 0 0.3rem 0.3rem 0.3rem;
        border: 0.0625rem solid #ff0033;
        margin-bottom: 2rem;
        .label {
          background: #ff0033;
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
        grid-template-columns: 10% 30% calc(60% - 2rem);
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
          border: 0.0625rem solid red;
          border-radius: 0 0 0.3rem 0.3rem;
          .label {
            background: #ff0033;
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
        }
      }
      .save-btn {
        width: 15rem;
        height: 4rem;

        border-style: none;
        outline: none;
        padding: 0 1rem;
        border-radius: 0.3rem;
        font-family: "Roboto 900";
        font-size: 2rem;
        line-height: 4rem;
        cursor: pointer;
        transition: 0.1s;
        background: #ff0033;
        color: white;

        &:hover {
          transition: 0.1s;
          background: #ffffff;
          color: #000000;
        }
      }
    }
  }
`;
const Search = () => {
  const fileRef = useRef<any>();
  let navigate = useNavigate();
  const app = useSelector((store: StoreInterface) => store.app);
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
  // const [alertImg, setAlertImg] = useState<any>(false);

  // console.log(alertImg);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.files?.[0];
    if (value && value.size > 1048576) {
      // setAlertImg(true);
    } else {
      setFile(value);
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.trim();
    setTitle(value);
  };
  const handleOriginalTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.trim();
    setOriginalTitle(value);
  };
  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.trim();
    setRating(value);
  };
  const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.trim();
    setYear(value);
  };
  const handleGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.trim();
    setGenre(value);
  };
  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.trim();
    setTime(value);
  };
  const handleActors = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.trim();
    setActors(value);
  };
  const handleSynopsis = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.currentTarget.value.trim();
    setSynopsis(value);
  };
  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.trim();
    setLink(value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();

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
    // console.log(formData)
    await axios
      .post(`${URI}/movies`, formData, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then((response) => {
        if (response.statusText === "OK") {
          navigate("/media");
        }
      });
  };
  // console.log(fileRef);
  // console.log(file);
  return (
    <SearchSt>
      <h2 className="title">Agregar peliculas</h2>

      <form className="upload-form" onSubmit={handleSubmit}>
        <section className="container-inputs">
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
              accept="image/png, image/jpeg, image/jpg, image/webp"
            />
          </div>
          <div className="input-form-container">
            <span className="label">Link del video mp4:</span>
            <input
              name="link"
              className="input-form"
              type="text"
              onChange={(e) => handleLink(e)}
              placeholder="Link de la película."
              value={link}
            />
          </div>
        </section>
        <button className="save-btn">Guardar</button>
      </form>
    </SearchSt>
  );
};

export default Search;
