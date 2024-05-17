"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatTopicList } from "./helper";
import Banner from "./components/Banner";

export default function Home() {
  const [topics, setTopics] = useState<Array<{
    id: string,
    name: string,
    description: string,
    image: string,
    createdAt: string,
  }>>([]);
  const [meta, setMeta] = useState<{
    page: string,
    limit: string,
  }>({
    page: '1',
    limit: '5',
  });
  const [isShowLoadMore, setIsShowLoadMore] = useState<boolean>(true);

  async function fetchTrendingTopics(isLoadMore: boolean = false) {
    try {
      const page = isLoadMore ? (parseInt(meta.page, 10) + 1).toString() : meta.page;
      const url = new URL('https://66461f0f51e227f23aaddd51.mockapi.io/trending');
      url.searchParams.append('page', page);
      url.searchParams.append('limit', meta.limit);

      const res = await fetch(url);
      const data = await res.json();
      const newTopics = [...topics, ...formatTopicList(data)];

      setTopics(newTopics);
      if (isLoadMore) setMeta({ ...meta, page });

      /**
       * mockAPI free access doesn't show total data (which are 25 data)
       * Therefore, the condition is hardcoded as below
       */
      if (newTopics.length >= 25) setIsShowLoadMore(false);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchTrendingTopics(false);
  }, []);

  return (
    <main>
      <Banner title="Trending Topics" subtitle="" />
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
                  className="rounded-md object-contain"
                  sizes="100%"
                  fill
                />
              </div>
              <div className="flex-1 px-4">
                <h2 className="text-2xl font-bold capitalize">
                  {topic.name}
                </h2>
                <p className="text-xs text-gray-500">
                  {topic.createdAt}
                </p>
                <p className="mt-1">
                  {topic.description}
                </p>
              </div>
            </Link>
          </article>
        ))}
        {isShowLoadMore && (
          <button
            onClick={() => fetchTrendingTopics(true)}
            className="bg-gray-400 p-3 text-white uppercase rounded-md"
          >
            Load More
          </button>
        )}
      </section>
    </main>
  );
};
