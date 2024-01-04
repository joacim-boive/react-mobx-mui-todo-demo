import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";
import { TStore } from "@/providers/long-press-provider";

export const useIsLongPressed = () => {
  const { longPress } = useContext(MobXProviderContext) as TStore;
  if (longPress === undefined)
    throw new Error("longPress must be used within a LongPressProvider");

  return longPress;
};
