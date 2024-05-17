import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header
          className={`
            flex w-full items-center justify-start p-4 bg-gray-300 fixed top-0 left-0 z-10
            lg:px-8 lg:relative
          `}
        >
          <Link href="/" className='flex gap-2 items-center hover:scale-125'>
            <Image
              src="/trending-topics-logo.png"
              alt="logo"
              width={30}
              height={30}
            />
          </Link>
        </header>
    );
};
