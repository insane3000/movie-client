import { MovieIT } from "interfaces/MovieInterface";

export type AppInterface = {
  showMenu: boolean;
  search: [MovieIT?];
  scroll: {
    home: number;
    movies: number;
    premieres: number;
    search: number;
  };
  login: {
    user: string;
    token: string;
  };
  // CashRegister: CashRegisterIT;
};
export const appTemplate: AppInterface = {
  showMenu: false,
  search: [],
  scroll: {
    home: 0,
    movies: 0,
    premieres: 0,
    search: 0,
  },
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
