// import { cashRegisterTemplate, CashRegisterIT } from "interfaces/Cashregister";

export type AppInterface = {
  showMenu: boolean;

  login: {
    user: string;
    token: string;
  };
  // CashRegister: CashRegisterIT;
};
export const appTemplate: AppInterface = {
  showMenu: false,

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
