"use client"

import { useEffect, useState } from 'react';
import { MdArrowUpward } from 'react-icons/md';

export default function ScrollToTopFAB() {
    const [isVisible, setIsVisible] = useState(false);

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    function handleScrollVisibility() {
        if (window.scrollY > 300) setIsVisible(true);
        else setIsVisible(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScrollVisibility);

        return () => {
            window.removeEventListener('scroll', handleScrollVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-5 right-5 border-solid border-2 border-gray-700 rounded-full bg-white w-12 h-12
                hover:scale-110 scroll-to-top ${isVisible ? "visible" : ""}
            `}
        >
            <MdArrowUpward size={30} className='mx-auto text-gray-700' />
        </button>
    );
};
