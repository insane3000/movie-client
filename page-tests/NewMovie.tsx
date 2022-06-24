import styled from "styled-components";
import { useParams } from "react-router-dom";
import Cluster from "../organisms/Cluster";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginServer, setModalReport } from "redux/actions/appAction";
import { useLocation } from "react-router";
// *Icons
// import CloseIcon from "icons/CloseIcon";
import Spinner05 from "../atoms/Spinner05";
import Error404 from "components/Error404";
import { MdSdCardAlert } from "react-icons/md";
import { useQuery } from "react-query";
import { StoreInterface } from "interfaces/storeTemplate";
import Player from "./Player";
import Spinner from "../atoms/Spinner";
import socket from "config/Socket";

const MovieSt = styled.div`
  width: 100%;
  height: auto;

  .movie-container {
    width: 100vw;
    height: 100vh;
    padding-top: 4rem;
    padding-bottom: 2rem;

    position: relative;

    .container-poster-data {
      width: 90%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: auto auto 2rem auto;

      .container-poster {
        width: 70vw;
        height: 100vw;
        position: relative;
        margin-bottom: 1rem;

        .img-movie {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .spinnerPoster {
          width: 100%;
          height: 100%;
          top: 0;
          position: absolute;
          background: #080012;
        }
      }
      .container-data {
        width: 100%;
        height: auto;
        .title-movie {
          font-family: "Roboto 900";
          font-size: 2rem;
          line-height: 2rem;
          margin-bottom: 0.5rem;
          text-align: center;
          color: #5900ff;
        }
        .year-genre-time {
          font-family: "Roboto 100";
          font-size: 0.8rem;
          text-align: center;
          color: white;
          margin-bottom: 0.5rem;
        }

        .rate {
          font-family: "Roboto 900";
          font-size: 1rem;
          color: white;
          margin-bottom: 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;

          .span {
            color: #6200ff;
            font-family: "Roboto 900";
            font-size: 1rem;
            margin-right: 0.5rem;
          }
        }
        .actors {
          width: 100%;
          height: auto;
          font-family: "Roboto 100";
          font-size: 1rem;
          color: white;
          margin-bottom: 0.5rem;

          // !Dots ...
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .span {
            color: #6200ff;
            font-family: "Roboto 900";
            font-size: 1rem;
          }
        }
        .synopsis {
          width: 100%;
          height: auto;
          font-family: "Roboto 300";
          font-size: 1rem;
          color: white;
        }
      }
    }
    .seasons {
      width: 90%;
      height: auto;
      margin: auto;
      margin-bottom: 0.5rem;
      position: relative;
      .select-arrow {
        background: #5900ff;
        width: 7.7rem;
        height: 2rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.3rem;
        .selectSeason {
          position: absolute;
          padding-left: 0.5rem;
          width: 100%;
          height: 2rem;
          outline: none;
          border-style: none;
          border-radius: 0.2rem;
          background: none;
          color: white;
          font-family: "Roboto 900";
          font-size: 0.8rem;
          cursor: pointer;

          // !hide arrow
          appearance: none;
          option {
            background: white;
            color: black;
            font-family: "Roboto 300";
          }
        }
        .sysIconArrow {
          width: 1.5rem;
          height: 1.5rem;
          position: absolute;
          right: 0.2rem;
          color: white;
        }
      }
      .report {
        background: #ffd000;
        width: 9.5rem;
        height: 2rem;
        position: absolute;
        right: 0;
        top: 0;
        font-family: "Roboto 900";
        color: #000000;
        font-size: 0.8rem;
        text-align: center;
        border-radius: 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .sysIconReport {
          width: 1.2rem;
          height: 1.2rem;
          margin-left: 0.2rem;
          color: black;
        }
      }
    }
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    background: #2003033d;
    .movie-container {
      width: 100vw;
      height: 100vh;
      position: relative;

      .container-poster-data {
        width: 80%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;

        .container-poster {
          width: 18rem;
          height: auto;
          position: relative;
          .img-movie {
            width: 100%;
            height: auto;
            object-fit: cover;
          }
          .spinnerPoster {
            width: 100%;
            height: 100%;
            top: 0;
            position: absolute;
            background: #080012;
          }
        }
        .container-data {
          width: calc(100% - 18rem);
          height: auto;
          padding: 1rem 1rem;
          .title-movie {
            font-family: "Roboto 900";
            font-size: 3rem;
            line-height: 3rem;
            margin-bottom: 0.5rem;
            text-align: left;
            color: #5900ff;
          }
          .year-genre-time {
            font-family: "Roboto 100";
            font-size: 1.5rem;
            text-align: left;
            color: white;
            margin-bottom: 0.5rem;
          }

          .rate {
            font-family: "Roboto 900";
            font-size: 1.5rem;
            color: white;
            margin-bottom: 0.5rem;
            display: flex;
            justify-content: start;
            align-items: center;

            .span {
              color: #6200ff;
              font-family: "Roboto 900";
              font-size: 1.5rem;
              margin-right: 0.5rem;
            }
          }
          .actors {
            width: 100%;
            height: 2rem;
            font-family: "Roboto 100";
            font-size: 1.5rem;
            color: white;
            margin-bottom: 0.5rem;

            // !Dots ...
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .span {
              color: #6200ff;
              font-family: "Roboto 900";
              font-size: 1.5rem;
              margin-right: 0.5rem;
            }
          }
          .synopsis {
            width: 100%;
            height: auto;
            font-family: "Roboto 300";
            font-size: 1.2rem;
            color: white;
            margin-top: 1rem;
          }
        }
      }
      .seasons {
        width: 80%;
        height: auto;
        margin: auto;
        margin-bottom: 1rem;

        .select-arrow {
          background: #5900ff;
          width: 12rem;
          height: 3rem;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.3rem;

          .selectSeason {
            position: absolute;
            padding-left: 1rem;
            width: 100%;
            height: 3rem;
            outline: none;
            border-style: none;
            border-radius: 0.2rem;
            background: none;
            color: white;
            font-family: "Roboto 900";
            font-size: 1.2rem;
            cursor: pointer;
            // !hide arrow
            appearance: none;
            option {
              background: white;
              color: black;
              font-family: "Roboto 300";
            }
          }
          .sysIconArrow {
            width: 2rem;
            height: 2rem;
            position: absolute;
            right: 0.5rem;
            color: white;
          }
        }
        .report {
          background: #ffd000;
          width: 14rem;
          height: 3rem;
          position: absolute;
          right: 0;
          top: 0;
          font-family: "Roboto 900";
          color: #000000;
          font-size: 1.2rem;
          line-height: 3rem;
          text-align: center;
          border-radius: 0.2rem;
          cursor: pointer;
          .sysIconReport {
            width: 1.5rem;
            height: 1.5rem;
            margin-left: 0.5rem;
            color: black;
          }
        }
      }
    }
  }
`;

const Movie = () => {
  //   const location = useLocation();
  //   const paramsLocation = new URLSearchParams(location.search);
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   const app = useSelector((store: StoreInterface) => store.app);

  //   //! States
  //   const [spinnerPoster, setSpinnerPoster] = useState(true);

  //   // !Obteniendo los parametros
  //   const id = paramsLocation.get("id");

  //   // !Fetching Function
  //   const fetch = async ({ queryKey }: any) => {
  //     setSpinnerPoster(true);
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_URL}/movie-client/${queryKey[0]}`,
  //       {
  //         headers: {
  //           authorization: `Bearer ${app.login.token}`,
  //           id: `${app.login.user}`,
  //           role: `${app.login.role}`,
  //         },
  //       }
  //     );
  //     return data;
  //   };

  //   // !UseQuery
  //   const { data, isLoading, isError } = useQuery([id], fetch, {
  //     //     keepPreviousData: true,
  //     staleTime: 0,
  //     cacheTime: 0,
  //     refetchOnWindowFocus: false,
  //   });

  //   const cleanText = data?.genre.replace("|", ".");
  //   const cleanSynopsis = data?.synopsis.replace("(FILMAFFINITY)", "");
  //   // !Spinner Poster
  //   const handleLoadImg = (e: any) => {
  //     e.currentTarget.complete && setSpinnerPoster(false);
  //   };
  //   //! handle REPORT MODAL
  //   const handlerReportModal = (id: any) => {
  //     dispatch(setModalReport(true, data._id, data.title, data.imageS, data.imageL, ""));
  //     !app.report.show && navigate(`${location.pathname}${location.search}`);
  //   };
  //   useEffect(() => {
  //     // ! Screens control
  //     socket.emit("userID", app.login.user);
  //     socket.on("users", async (data) => {
  //       const screens = await axios
  //         .get(`${process.env.REACT_APP_BACKEND_URL}/client-screens/${app.login.user}`)
  //         .then(function (response) {
  //           return response.data;
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  //       let userID = data.filter((i: any) => i.userID === app.login.user);
  //       if (userID.length > screens) {
  //         navigate("/user-connected-error");
  //       }
  //     });
  //   }, []);
  //   if (isLoading) {
  //     return <Spinner />;
  //   }
  //   if (isError) {
  //     return <h1>Error</h1>;
  //   }
  return (
    <MovieSt>
      {/* <div className="movie-container">
        <div className="container-poster-data">
          <div className="container-poster">
            <img
              className="img-movie"
              src={`${process.env.REACT_APP_BUCKET}${data.imageL}`}
              alt=""
              onLoad={(e) => handleLoadImg(e)}
            />
            {spinnerPoster && (
              <section className="spinnerPoster">
                <Spinner05 />
              </section>
            )}
          </div>
          <div className="container-data">
            <h2 className="title-movie">{data.title}</h2>
            <h3 className="year-genre-time">
              {data.year} • {cleanText.split(".")[0]}. {cleanText.split(".")[1]}.{" "}
              {cleanText.split(".")[2]} • {data.time}
            </h3>
            <h3 className="rate">
              <span className="span">Calificación: </span>{" "}
              {data.rating === 0 ? "Sin calificación" : data.rating}
            </h3>
            <p className="actors">
              <span className="span">Actores:</span> {data.actors}
            </p>
            <p className="actors">
              <span className="span">Idioma disponible:</span> {data.language}
            </p>
            <p className="synopsis">{cleanSynopsis}</p>
          </div>
        </div>

        <div className="seasons">
          <section className="select-arrow" style={{ background: "none" }}></section>
          <section className="report" title="Reportar un problema." onClick={handlerReportModal}>
            Reportar problema <MdSdCardAlert className="sysIconReport" />
          </section>
        </div>

        <Player link={data.link} />
        {data.genre !== "" && <Cluster genre={data.folder} subtitle="Relacionados" text="" />}
      </div> */}
    </MovieSt>
  );
};

export default Movie;
