import styled from "styled-components";
// import ReactPlayer from "react-player";
import Pattern from "img/pattern.png";
import MoviesGender from "../organisms/MoviesGender";
import Navigation from "../organisms/Navigation";
const UserSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background: #070707;
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    font-family: "Roboto 900";
    font-size: 4rem;

    /* background-color: transparent; 
     background-image: url(${Pattern});
    background-size: 4.6875rem;
    background-repeat: repeat;
    background-attachment: fixed;
    position: relative; */
    background: #080808;
background: linear-gradient(90deg, #0d0c13 0%, #120d25 100%);
    .container {
      width: 100%;
      height: calc(100% - 5rem);
      overflow-y: scroll;
      overflow-x: hidden;
      /* margin-top: 3rem; */
    }
  }
`;
const Home = () => {
  return (
    <UserSt>
      <Navigation />
      <div className="container">
        <MoviesGender subtitle="Estrenos" />
        <MoviesGender subtitle="Accion" />
        <MoviesGender subtitle="Comedia" />
        <MoviesGender subtitle="Terror" />
      </div>
    </UserSt>
  );
};

export default Home;
