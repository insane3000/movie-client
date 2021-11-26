import React from "react";
import styled from "styled-components";
// *Images
import BannerImg from "img/banner.jpg";
import { useDispatch } from "react-redux";
import { setModal } from "redux/actions/appAction";
const BannerSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 50rem;
    position: absolute;
    top: 0;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .gradient-banner {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      background: rgb(63, 94, 251);
      background: radial-gradient(
        circle,
        rgba(63, 94, 251, 0) 0%,
        rgba(0, 0, 0, 0.9827001064097514) 100%
      );
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: flex-start;
      /* padding-top: 15rem;
      padding-left: 8rem; */
      .data-container {
        width: auto;
        height: auto;
        position: absolute;
        left: 4rem;
        bottom: 15rem;
        /* padding: 0 2rem; */
        .banner-title {
          font-family: "Roboto 900";
          font-size: 5rem;
          color: white;
          text-shadow: 1px 1px 3px black;
        }
        .rating {
          font-family: "Roboto 700";
          font-size: 2rem;
          color: white;
          text-shadow: 1px 1px 3px black;
          margin-bottom: 1rem;
        }
        .btn-container {
          width: 100%;
          height: 3rem;
          text-shadow: 1px 1px 3px black;
          display: flex;
          justify-content: start;
          align-items: center;
          .button-play {
            background: white;
            width: 15rem;
            height: 3rem;
            border-style: none;
            border-radius: 0.3rem;
            font-family: "Roboto 900";
            font-size: 1.5rem;
            color: #000000;
            cursor: pointer;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            transition: 0.1s;

            &:hover {
              background: #dfdfdf;
              transition: 0.1s;
            }
          }
        }
      }
    }
  }
`;
const Banner = () => {
  const dispatch = useDispatch();
  const handleModal = (id: string) => {
    console.log(id);
    dispatch(setModal(id, true));
  };
  return (
    <BannerSt>
      <img src={BannerImg} alt="" />
      <div className="gradient-banner">
        <div className="data-container">
          <h1 className="banner-title">Escuadron Suicida 2</h1>
          <h1 className="rating">Calificación: 7</h1>
          <section className="btn-container">
            <button className="button-play" onClick={() => handleModal("618ae6ebf409c95b2329dc44")}>
              Ver Ahora
            </button>
          </section>
        </div>
      </div>
    </BannerSt>
  );
};

export default Banner;
