import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
// import { useHistory } from "react-router";
// *Icons
import MaintenanceIcon from "icons/MaintenanceIcon";
import ProductsIcon from "icons/ProductsIcon";
import ServersIcon from "icons/ServersIcon";
import LogoutIcon from "icons/LogoutIcon";
import LoginIcon from "icons/LoginIcon";
import { loginServer } from "redux/actions/appAction";
const NavigationSt = styled.nav`
  width: 100%;
  height: 100%;
  display: grid;
  /* grid-template-columns: repeat(auto-fit, 2.5rem); */
  grid-template-columns: 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem 2.5rem;
  grid-auto-rows: 2.5rem;
  gap: 0.2rem;
  justify-content: start;
  align-content: center;
  background: #0c0c0c;
  border-bottom: 0.0625rem solid #333333;
  overflow-y: scroll;
  padding: 0 0.5rem;
  .navLink {
    background: #222222;
    border-radius: 0.3rem;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    /* font-family: "Roboto 300";
    font-size: 0.5rem;
    text-align: center; */
    .sysIcon {
      width: 1.5rem;
      height: 1.5rem;
    }
    .text {
    }
    .none {
      display: none;
    }
  }
  .activeNavLink {
    background: #6200ff;
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: grid;
    grid-template-columns: 5rem;
    grid-auto-rows: 5rem;
    gap: 0.5rem;
    justify-content: center;
    align-content: flex-start;
    background: #0c0c0c;
    border-right: 0.0625rem solid #333333;
    overflow-y: scroll;
    padding: 1rem 0;

    .navLink {
      width: 100%;
      height: 100%;
      background: #222222;
      border-radius: 0.3rem;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #a8a8a8;

      .sysIcon {
        width: 3rem;
        height: 3rem;
      }
      .text {
        margin-top: 0.2rem;
        font-family: "Roboto 300";
        font-size: 0.6rem;
      }
      .none {
        display: flex;
      }
      :hover {
        background: #6200ffe6;
        color: white;
      }
    }
    .active {
      background: #6200ff;
      color: white;
    }
  }
`;
const Navigation = () => {
  const dispatch = useDispatch();
  //   const history = useHistory();
  // const app = useSelector((store: StoreInterface) => store.app);
  const reloadPage = (e: any) => {
    dispatch(loginServer("", "", ""));
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    // history.push(`admin/login`);
  };
  return (
    <NavigationSt>
      <NavLink className="navLink" to="/admin/media">
        <ProductsIcon className="sysIcon" />
        <span className="text none">Media</span>
      </NavLink>
      <NavLink className="navLink" to="/admin/clients">
        <ServersIcon className="sysIcon" />
        <span className="text none">Clientes</span>
      </NavLink>

      <NavLink className="navLink" to="/admin/login">
        <LoginIcon className="sysIcon" />
        <span className="text none">Entrar</span>
      </NavLink>

      <NavLink className="navLink" to="/admin/login" onClick={reloadPage}>
        <LogoutIcon className="sysIcon" />
        <span className="text none">Salir</span>
      </NavLink>
      <NavLink className="navLink" to="/browser">
        <MaintenanceIcon className="sysIcon" />
        <span className="text none">Browser</span>
      </NavLink>
    </NavigationSt>
  );
};

export default Navigation;
