import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loader = ({ count }: { count: number }) => {
  return (
    <div>
      <SkeletonTheme
        baseColor="rgb(180, 180, 180)"
        highlightColor="white"
        height={"6rem"}
      >
        <p>
          <Skeleton count={count} />
        </p>
      </SkeletonTheme>
    </div>
  );
};

export default Loader;
