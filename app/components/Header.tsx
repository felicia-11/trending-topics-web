import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="relative flex w-full items-center p-4 justify-start gap-2 bg-gray-300 text-white lg:flex-wrap lg:px-8">
          <Link href="/" className='flex gap-2 items-center'>
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
