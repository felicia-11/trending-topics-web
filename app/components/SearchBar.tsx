import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

export default function SearchBar({ onSubmit }: { onSubmit: Function }) {
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        onSubmit(search);
    }, [search]);

    return (
        <div className="w-full relative lg:w-2/5">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <MdOutlineSearch size={20} />
            </div>
            <input
                type="search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-400 rounded-md"
                placeholder="Search..."
                onChange={(e: any) => setTimeout(() => {
                    setSearch(e.target.value);
                }, 1500)}
            />
        </div>
    );
};
