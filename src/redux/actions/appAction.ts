import { ActionType } from "redux/types";
import { Dispatch } from "redux";
import { ActionsInterface } from "interfaces/ActionsInterface";
// !Seteando SHOW MENU
export const showMenu =
  (data: boolean) => (dispatch: Dispatch<ActionsInterface>) => {
    // console.log(data);
    dispatch({
      type: ActionType.SHOW_MENU,
      payload: data,
    });
  };
// !Seteando LOGIN
export const loginServer =
  (user: string, token: string) => (dispatch: Dispatch<ActionsInterface>) => {
    // console.log(data);
    dispatch({
      type: ActionType.LOGIN,
      user,
      token,
    });
  };
