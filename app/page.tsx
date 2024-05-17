"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatTopicList } from "./helper";

export default function Home() {
  const [topics, setTopics] = useState<Array<{
    id: string,
    name: string,
    description: string,
    image: string,
    createdAt: string,
  }>>([]);

  async function fetchTrendingTopics() {
    try {
      const url = new URL('https://66461f0f51e227f23aaddd51.mockapi.io/trending');
      url.searchParams.append('page', '1');
      url.searchParams.append('limit', '5');

      const res = await fetch(url);
      const data = await res.json();

      setTopics(formatTopicList(data));
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchTrendingTopics();
  }, []);

  return (
    <main>
      <section className="flex items-center justify-center w-screen h-48 parallax-bg newspaper-bg my-8">
        <h1 className="text-center text-3xl text-white font-bold uppercase">
          Trending Topics
        </h1>
      </section>
      <section className="flex flex-col gap-3 w-3/5 mx-auto mb-10">
        {topics.map(topic => (
          <article key={`topic-${topic.id}`}>
            <Link
              href={`/topic/${topic.id}`}
              className="flex border-solid border-2 border-gray-400 rounded-md p-3"
            >
              <div className="w-40 h-32 relative">
                <Image
                  src={topic.image}
                  alt="preview-image"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              <div className="flex-1 px-4">
                <h2 className="text-2xl font-bold capitalize mb-1">{topic.name}</h2>
                <p>{topic.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
};
