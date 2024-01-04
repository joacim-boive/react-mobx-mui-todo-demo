import { FC, ReactNode } from "react";
import { Provider, observer } from "mobx-react";
import { TLongPress } from "@/stores/long-press-state";

type TProps = {
  children: ReactNode;
  longPress: TLongPress;
};
export type TStore = {
  longPress: TLongPress;
};

export const LongPressProvider: FC<TProps> = observer(
  ({ children, longPress }) => {
    return <Provider longPress={longPress}>{children}</Provider>;
  }
);
