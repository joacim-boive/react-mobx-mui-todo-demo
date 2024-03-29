import { DO_DIALOG } from "@/actions";
import { LongPressProvider } from "@/contexts/long-press-context";
import { useLongPress } from "@/hooks/use-long-press";
import { fireEvent } from "@testing-library/dom";
import { act, renderHook, RenderHookOptions } from "@testing-library/react";
import { observer } from "mobx-react";
import React, { ReactNode } from "react";
import { longPressState } from "@/stores/long-press-state.ts";

jest.useFakeTimers();

type TProps = {
  children: ReactNode;
};

const renderHookWithProvider = <P, R>(
  callback: (props: P) => R,
  options?: RenderHookOptions<P>
) => {
  const Wrapper: React.FC<TProps> = observer(({ children }) => (
    <LongPressProvider longPress={longPressState}>{children}</LongPressProvider>
  ));

  return renderHook(callback, { ...options, wrapper: Wrapper });
};

describe("useLongPress", () => {
  it("sets showMenu to true when window is touched for longer than delay", () => {
    const delay = 500;
    const { result } = renderHookWithProvider(() => useLongPress(delay));

    act(() => {
      fireEvent.touchStart(window, { touches: [{ clientX: 0, clientY: 0 }] });
      jest.advanceTimersByTime(delay + 1);
    });

    expect(result?.current.doAction).toBe(DO_DIALOG);
  });
  it("wont set showMenu to true when window is touched for shorter than delay", () => {
    const delay = 500;
    const { result } = renderHookWithProvider(() => useLongPress(delay));

    act(() => {
      fireEvent.touchStart(window, { touches: [{ clientX: 0, clientY: 0 }] });
      jest.advanceTimersByTime(delay - 1);
    });

    expect(result?.current.doAction).toBe("");
  });
});
