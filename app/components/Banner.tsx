import { Fragment } from "react";
import SkeletonLoad from "./Skeleton";

export default function Banner({
    title = '',
    subtitle = '',
    isLoading = false,
}: {
    title: string,
    subtitle: string,
    isLoading: boolean,
}) {
    return (
        <section className="flex flex-col items-center justify-center gap-2 w-full h-48 parallax-bg newspaper-bg mb-8 mt-20 lg:mt-8">
            <div className="w-9/12">
                {isLoading
                    ? <SkeletonLoad count={1} />
                    : (
                        <Fragment>
                            <h1 className="text-center text-3xl text-white font-bold uppercase">
                                {title}
                            </h1>
                            {subtitle !== '' && (
                                <h2 className="text-center text-lg text-white capitalize">
                                    {subtitle}
                                </h2>
                            )}
                        </Fragment>
                    )
                }
            </div>
        </section>
    );
};
