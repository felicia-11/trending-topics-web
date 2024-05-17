import Image from "next/image";
import { MdBrokenImage } from 'react-icons/md';

export default function AdvertisementBox({
    image = '',
    isLoading = false,
}: {
    image: string,
    isLoading: boolean,
}) {
    return (
        <a
            href={image} // in real case can be changed into advertisement's link
            target="_blank"
            className="flex flex-col w-1/3 mx-auto my-4 border-solid border-2 border-gray-300"
        >
            <p className="text-center text-gray-400 text-xs uppercase my-1">
                Advertisement
            </p>
            {isLoading || image === '' ? (
                <div className="flex items-center justify-center w-full h-full min-h-40 mx-auto bg-gray-300">
                    <MdBrokenImage size={30} color="white" />
                </div>
            ) : (
                <div className="w-full h-full min-h-40 mx-auto relative">
                    {image !== '' && (
                        <Image
                            src={image}
                            alt="advertisement"
                            sizes="100%"
                            fill
                        />
                    )}
                </div>
            )}
        </a>
    );
};
