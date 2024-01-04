import { observable, action } from "mobx";

export interface IAppStore {
  isLongPressed: boolean;
  setIsLongPressed: (value: boolean) => void;
}

export const appStore: IAppStore = observable({
  isLongPressed: false,
  setIsLongPressed: action((value: boolean) => {
    appStore.isLongPressed = value;
  }),
});
