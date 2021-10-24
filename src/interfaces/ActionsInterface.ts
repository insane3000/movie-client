import { ActionType } from "redux/types";

interface showMenu {
  type: ActionType.SHOW_MENU;
  payload: boolean;
}
interface loginServer {
  type: ActionType.LOGIN;
  user: string;
  token: string;
}

export type ActionsInterface = showMenu | loginServer;
