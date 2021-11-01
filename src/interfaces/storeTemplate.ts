import { MovieIT } from "interfaces/MovieInterface";

export type AppInterface = {
  showMenu: boolean;
  search: [MovieIT?];
  login: {
    user: string;
    token: string;
  };
  // CashRegister: CashRegisterIT;
};
export const appTemplate: AppInterface = {
  showMenu: false,
  search: [],
  login: {
    user: "",
    token: "",
  },
  // CashRegister: cashRegisterTemplate,
};

export interface StoreInterface {
  app: AppInterface;
}
export const storeTemplate: StoreInterface = {
  app: appTemplate,
};
