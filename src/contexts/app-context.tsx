import { useContext } from "react";
import { FC, ReactNode } from "react";
import { Provider, MobXProviderContext, observer } from "mobx-react";
import { appStore } from "@stores/app-store";

interface IProps {
  children: ReactNode;
  appStore: typeof appStore;
}
export interface IStore {
  appStore: typeof appStore;
}

export const AppProvider: FC<IProps> = observer(({ children, appStore }) => {
  return <Provider appStore={appStore}>{children}</Provider>;
});

export const useIsLongPressed = () => {
  const { appStore } = useContext(MobXProviderContext) as IStore;
  return appStore;
};
