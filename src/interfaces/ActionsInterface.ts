import { ActionType } from "redux/types";
import { MovieIT, movieTemplate } from "interfaces/MovieInterface";
interface showMenu {
  type: ActionType.SHOW_MENU;
  payload: boolean;
}
interface loginServer {
  type: ActionType.LOGIN;
  user: string;
  token: string;
}
interface search {
  type: ActionType.SEARCH;
  payload: MovieIT;
}

export type ActionsInterface = showMenu | loginServer | search;