"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from 'react-toastify';
import { MdInfoOutline } from 'react-icons/md';
import { formatTopicList } from "./helper";

import Banner from "./components/Banner";
import SkeletonLoad from "./components/Skeleton";
import TopicCard from "./components/TopicCard";
import SearchBar from "./components/SearchBar";

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
    search: string,
  }>({
    page: '1',
    limit: '5',
    search: '',
  });
  const [isShowLoadMore, setIsShowLoadMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  async function fetchTrendingTopics(isLoadMore: boolean, search: string = '') {
    setIsLoading(true);
    let page = meta.page;
    const url = new URL('https://66461f0f51e227f23aaddd51.mockapi.io/trending');

    try {
      if (search) {
        page = '1';
        url.searchParams.append('search', search);
      } else if (isLoadMore) {
        page = (parseInt(meta.page, 10) + 1).toString();
      }

      url.searchParams.append('page', page);
      url.searchParams.append('limit', meta.limit);
      setMeta({ ...meta, page, search });

      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json();
        const newTopics = search || (!search && meta.search)
          ? [...formatTopicList(data)]
          : [...topics, ...formatTopicList(data)];
  
        setTopics(newTopics);
  
        /**
         * mockAPI free access doesn't show total data (which are 25 data)
         * Therefore, the condition is hardcoded as below
         */
        if (newTopics.length >= 25 || data.length < 5) setIsShowLoadMore(false);
        else setIsShowLoadMore(true);
      } else if (res.status === 404) {
        setTopics([]);
        throw new Error(res.status.toString());
      }

    } catch (error: any) {
      if (error.message !== '404') toast(error.message);
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
        <SearchBar onSubmit={(search: string) => fetchTrendingTopics(false, search)} />
        {isInitialLoad && <SkeletonLoad count={5} />}
        {!isLoading && topics.length === 0 ? (
          <div className="flex gap-2 justify-center items-center text-xl border-solid border-2 border-gray-400 rounded-md p-3">
            <MdInfoOutline size={28} />
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
