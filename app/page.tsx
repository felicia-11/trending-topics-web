"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from 'react-toastify';
import { MdOutlineFolderOff } from 'react-icons/md';
import { formatTopicList } from "./helper";

import Banner from "./components/Banner";
import SkeletonLoad from "./components/Skeleton";
import TopicCard from "./components/TopicCard";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  async function fetchTrendingTopics(isLoadMore: boolean = false) {
    setIsLoading(true);

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
    } catch (error: any) {
      toast(error.message);
    } finally {
      setIsLoading(false);
      if (isInitialLoad) setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchTrendingTopics(false);
  }, []);

  return (
    <main>
      <Banner
        title="Trending Topics"
        subtitle=""
        isLoading={false}
      />
      <section className="flex flex-col gap-3 w-3/4 mx-auto mb-10 lg:w-3/5">
        {isInitialLoad && <SkeletonLoad count={5} />}
        {!isLoading && topics.length === 0 ? (
          <div className="flex gap-2 justify-center items-center text-xl">
            <MdOutlineFolderOff size={28} />
            Data Not Found
          </div>
        ) : topics.map(topic => (
          <TopicCard key={`topic-${topic.id}`} data={topic} />
        ))}
        {(!isLoading && topics.length === 0) || !isShowLoadMore ? null : (
          <button
            onClick={() => fetchTrendingTopics(true)}
            className="bg-gray-400 p-3 text-white uppercase rounded-md hover:bg-gray-500"
            disabled={isLoading}
          >
            {isLoading ?
              (
                <Image
                  src="/loading-gif.gif"
                  alt="loading"
                  width={24}
                  height={24}
                  className="mx-auto w-6 h-6"
                />
              ) : "Load More"
            }
          </button>
        )}
      </section>
    </main>
  );
};
