"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import moment from "moment";
import { MdOutlineThumbUp, MdOutlineThumbDown } from 'react-icons/md';
import { formatTopicDetail } from "../helper";

import Banner from "@/app/components/Banner";
import SideList from "@/app/components/SideList";
import Comments from "@/app/components/Comments";
import AdvertisementBox from "@/app/components/AdvertisementBox";

export default function Topic() {
    const { id: topicId } = useParams<{ id: string }>();
    const [topic, setTopic] = useState<{
        adsImage: string,
        comments: any[],
        createdAt: string,
        description: string,
        descriptionDetail: string,
        dislikes: number,
        id: string,
        image: string,
        imageBy: string,
        likes: number,
        name: string,
        writer: string,
    }>({
        adsImage: '',
        comments: [],
        createdAt: '',
        description: '',
        descriptionDetail: '',
        dislikes: 0,
        id: '',
        image: '',
        imageBy: '',
        likes: 0,
        name: '',
        writer: '',
    });
    const [popularTopics, setPopularTopics] = useState<any[]>([]);
    const [voteType, setVoteType] = useState<string>('');

    function updateVotes(type: string) {
        if (type === 'like' && voteType === 'like') {
            setVoteType('');
            setTopic({ ...topic, likes: --topic.likes });
        } else if (type === 'like') {
            setVoteType('like');

            if (voteType === 'dislike') {
                setTopic({ ...topic, likes: ++topic.likes, dislikes: --topic.dislikes });
            } else {
                setTopic({ ...topic, likes: ++topic.likes });
            }
        } else if (type === 'dislike' && voteType === 'dislike') {
            setVoteType('');
            setTopic({ ...topic, dislikes: --topic.dislikes });
        } else {
            setVoteType('dislike');

            if (voteType === 'like') {
                setTopic({ ...topic, likes: --topic.likes, dislikes: ++topic.dislikes });
            } else {
                setTopic({ ...topic, dislikes: ++topic.dislikes });
            }
        }
    };

    function submitComment(comment: string) {
        const formattedComment = {
            comment,
            created_at: moment(),
            id: moment().valueOf().toString(),
            name: 'You',
            photo: '',
        };
        const newComments = [...topic.comments, ...[formattedComment]];

        setTopic({ ...topic, comments: newComments });
    };

    async function fetchTopicDetail() {
        try {
            const res = await fetch(`https://66461f0f51e227f23aaddd51.mockapi.io/trending/${topicId}`);
            const data = await res.json();
            const formattedData = formatTopicDetail(data);

            setTopic(formattedData);
        } catch (error) {
            console.log(error);
        }
    };

    async function fetchPopularTopics() {
        try {
            const url = new URL('https://66461f0f51e227f23aaddd51.mockapi.io/trending');
            url.searchParams.append('page', '1');
            url.searchParams.append('limit', '5');

            const popularRes = await fetch(url);
            const popularData = await popularRes.json();

            setPopularTopics(popularData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTopicDetail();
        fetchPopularTopics();
    }, []);

    return (
        <main>
            <Banner
                title={topic.name}
                subtitle={`${topic.writer} - ${topic.createdAt}`}
            />
            <section className="flex">
                <article className="w-3/4 h-full px-10">
                    <div className="w-3/5 h-full min-h-80 mx-auto relative">
                        {topic.image !== '' && (
                            <Image
                                src={topic.image}
                                alt="topic-image"
                                className="rounded-md"
                                sizes="100%"
                                fill
                            />
                        )}
                    </div>
                    <p className="mt-1 mb-4 text-xs text-center text-gray-500">
                        {`Picture by ${topic.imageBy}`}
                    </p>
                    <p>{topic.description}</p>
                    <AdvertisementBox image={topic.adsImage} />
                    <p>{topic.descriptionDetail}</p>
                    <div className="flex justify-end items-center gap-2 mt-10">
                        <p className="font-bold text-gray-500">Do you like this topic?</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => updateVotes('like')}
                                className={`flex items-center gap-2 px-3 py-0.5 border-solid border-2 border-gray-600 rounded-full hover:text-blue-600
                                    ${voteType === 'like' ? 'text-blue-600' : 'text-gray-600'}
                                `}
                            >
                                <MdOutlineThumbUp size={20} />
                                <p>{topic.likes}</p>
                            </button>
                            <button
                                onClick={() => updateVotes('dislike')}
                                className={`flex items-center gap-2 px-3 py-0.5 border-solid border-2 border-gray-600 rounded-full hover:text-red-600
                                    ${voteType === 'dislike' ? 'text-red-600' : 'text-gray-600'}
                                `}
                            >
                                <MdOutlineThumbDown size={20} />
                                <p>{topic.dislikes}</p>
                            </button>
                        </div>
                    </div>
                </article>
                <SideList title="Popular Topics" data={popularTopics} />
            </section>
            <Comments comments={topic.comments} onSubmit={submitComment} />
        </main>
    );
};
