import React from "react";
import styled from "styled-components";
// *Images
import BannerImg from "img/banner2.jpg";
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
    }
    .gradient-banner {
      width: 100%;
      height: 100%;
      /* background: #06020e; */
      position: absolute;
      top: 0;
      /* background: red; */
      background: rgb(6, 2, 14);
      background: radial-gradient(
        circle,
        rgba(6, 2, 14, 0.5566496862416841) 0%,
        rgba(6, 2, 14, 1) 100%
      );
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: flex-start;
      padding-top: 15rem;
      padding-left: 8rem;
      .banner-title {
        /* background: red; */
        font-family: "Roboto 900";
        font-size: 5rem;
        color: white;
        text-shadow: 2px 2px 5px black;
      }
      .banner-sinopsys {
        /* background: red; */
        width: 60rem;
        font-family: "Roboto 300";
        font-size: 1.5rem;
        color: white;
        text-shadow: 1px 1px 3px black;
      }
      .btn-container {
        /* background: red; */
        width: 60rem;
        height: 3rem;
        margin-top: 2rem;

        text-shadow: 1px 1px 3px black;
        display: flex;
        justify-content: center;
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
        <h1 className="banner-title">El Escuadrón Suicida</h1>
        <p className="banner-sinopsys">
          Un grupo de super villanos se encuentran encerrados en Belle Reve, una prisión de alta
          seguridad con la tasa de mortalidad más alta de Estados Unidos. Para salir de allí harán
          cualquier cosa, incluso unirse al grupo Task Force X, dedicado a llevar a cabo misiones
          suicidas bajo las órdenes de Amanda Waller. Fuertemente armados son enviados a la isla
          Corto Maltese, una jungla repleta de enemigos.
        </p>
        <section className="btn-container">
          <button className="button-play" onClick={() => handleModal("618ae6ebf409c95b2329dc44")}>
            Ver Ahora
          </button>
        </section>
      </div>
    </BannerSt>
  );
};

export default Banner;
