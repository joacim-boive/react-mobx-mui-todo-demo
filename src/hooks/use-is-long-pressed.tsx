import { useContext } from "react";
import { LongPressContext } from "@/contexts/long-press-context";
import { TLongPress } from "@/stores/long-press-state";

export const useIsLongPressed = (): TLongPress => {
  const context = useContext(LongPressContext);
  if (context === undefined) {
    throw new Error("useLongPress must be used within a LongPressProvider");
  }
  return context;
};
