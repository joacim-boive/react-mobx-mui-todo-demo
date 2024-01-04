import { observable, action } from "mobx";

export type TLongPress = {
  isLongPressed: boolean;
  setIsLongPressed: (value: boolean) => void;
};

export const longPressState: TLongPress = observable({
  isLongPressed: false,
  setIsLongPressed: action("Set isLongPressed", (value: boolean) => {
    longPressState.isLongPressed = value;
  }),
});
