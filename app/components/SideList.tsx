import Link from "next/link";
import Image from "next/image";

export default function SideList({ title, data }: { title: string, data: any[] }) {
    return (
        <article className="w-1/4 px-4 mr-10 bg-gray-100">
            <h3 className="text-center font-bold uppercase my-4">
                {title}
            </h3>
            <div className="flex flex-col gap-3">
                {data.map((res, idx) => (
                    <Link
                        key={`popular-topic-${res.id}`}
                        href={`/topic/${res.id}`}
                        className="flex items-center bg-white rounded-md hover:brightness-90"
                    >
                        <div className="p-2">
                            <p className="text-2xl font-bold">
                                {idx + 1}
                            </p>
                        </div>
                        {res.image !== '' && (
                            <Image
                                src={res.image}
                                alt="preview-image"
                                width={80}
                                height={60}
                            />
                        )}
                        <div className="p-2">
                            <p className="text-sm font-bold leading-normal capitalize">
                                {res.name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </article>
    );
};
