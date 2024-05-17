import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonLoad({ count = 1 }: { count: number }) {
    return <Skeleton count={count} />
};
