import Link from "next/link";
import Image from "next/image";

export default function TopicCard({ data }: { data: any }) {
    return (
        <article className="hover:scale-105">
          <Link
            href={`/topic/${data.id}`}
            className="flex border-solid border-2 border-gray-400 rounded-md p-3"
          >
            {data.image === '' ? (
              <div className="w-40 h-32 bg-gray-300"></div>
            ) : (
              <div className="w-40 h-32 relative">
                <Image
                  src={data.image}
                  alt="preview-image"
                  className="rounded-md object-contain"
                  sizes="100%"
                  fill
                />
              </div>
            )}
            <div className="flex-1 px-4">
              <h2 className="text-2xl font-bold capitalize">
                {data.name}
              </h2>
              <p className="text-xs text-gray-500">
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
