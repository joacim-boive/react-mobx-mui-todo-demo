import { FC, ReactNode, createContext } from "react";
import { TLongPress } from "@/stores/long-press-state";
import { observer } from "mobx-react-lite";

type TProps = {
  children: ReactNode;
  longPress: TLongPress;
};
export type TStore = {
  longPress: TLongPress;
};
// Create a context for longPress
export const LongPressContext = createContext<TLongPress | undefined>(
  undefined
);

// Create a provider component
export const LongPressProvider: FC<TProps> = observer(
  ({ children, longPress }) => {
    return (
      <LongPressContext.Provider value={longPress}>
        {children}
      </LongPressContext.Provider>
    );
  }
);
