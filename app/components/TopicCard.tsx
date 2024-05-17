import Link from "next/link";
import Image from "next/image";

export default function TopicCard({ data }: { data: any }) {
    return (
        <article className="text-center lg:text-left hover:scale-105">
          <Link
            href={`/topic/${data.id}`}
            className={`
                flex flex-col gap-2 items-center border-solid border-2 border-gray-400 rounded-md p-3
                lg:flex-row lg:gap-0
            `}
          >
            {data.image === '' ? (
              <div className="w-full h-32 bg-gray-300 lg:w-40"></div>
            ) : (
              <div className="w-full h-32 relative lg:w-40">
                <Image
                  src={data.image}
                  alt="preview-image"
                  className="rounded-md object-contain"
                  sizes="100%"
                  fill
                />
              </div>
            )}
            <div className="flex-1 lg:px-4">
              <h2 className="text-2xl font-bold capitalize">
                {data.name}
              </h2>
              <p className="text-xs text-gray-500 py-1 lg:py-0">
                {data.createdAt}
              </p>
              <p className="mt-1">
                {data.description}
              </p>
            </div>
          </Link>
        </article>
    );
};
