import "./index.css";
import { Composition } from "remotion";
import { PortfolioLaunch, TOTAL_FRAMES } from "./PortfolioLaunch";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PortfolioLaunch"
        component={PortfolioLaunch}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
