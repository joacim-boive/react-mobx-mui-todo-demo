import { useScreenSize } from "@/hooks/use-screen-size";
import { type FC, Suspense, lazy } from "react";
import { observer } from "mobx-react";
const ToggleDesktop = lazy(() => import("@components/toggles/toggle-desktop"));
const ToggleMobile = lazy(() => import("@components/toggles/toggle-mobile"));

export const ToggleMode: FC = observer(() => {
  const { isSmallScreen } = useScreenSize();

  return isSmallScreen ? (
    <Suspense fallback={<div>Loading...</div>}>
      <ToggleMobile />
    </Suspense>
  ) : (
    <Suspense fallback={<div>Loading...</div>}>
      <ToggleDesktop />
    </Suspense>
  );
});
