import { useState } from "react";
import Image from "next/image";
import moment from "moment";
import { MdComment, MdOutlineSend } from 'react-icons/md';

export default function Comments({ comments = [], onSubmit }: { comments: any[], onSubmit: Function }) {
    const [comment, setComment] = useState<string>('');

    function submit() {
        onSubmit(comment);
        setComment('');
    };

    return (
        <section className="flex flex-col gap-3 m-10 p-6 bg-gray-200 rounded-md">
            <div className="flex items-center gap-1">
                <MdComment size={20} />
                <p className="font-bold">Comment</p>
            </div>
            <textarea
                rows={4}
                className="w-full p-2 resize-none rounded-sm"
                placeholder="Write your comment here..."
                onChange={e => setComment(e.target.value)}
                value={comment}
            />
            <button
                onClick={submit}
                className="flex items-center justify-center gap-2 w-24 ml-auto p-1 bg-gray-800 text-white rounded-sm"
            >
                <MdOutlineSend size={20} />
                Send
            </button>
            {comments.length > 0 ? comments.map(data => (
                <div key={`comment-${data.id}`}>
                    <hr className="border-gray-400 mb-3" />
                    <div className="flex gap-3">
                        <Image
                            src={data.photo || "/dummy-profile-picture.png"}
                            alt="user-picture"
                            width={100}
                            height={100}
                            className="w-24 h-24 object-cover"
                        />
                        <div className="flex flex-col flex-1">
                            <p className="font-bold">{data.name}</p>
                            <p className="text-xs text-gray-600">{moment(data.created_at).format('DD MMM YYYY - h:mm A')}</p>
                            <p className="text-sm mt-1">{data.comment}</p>
                        </div>
                    </div>
                </div>
            )) : (
                <div>
                    <hr className="border-gray-400 mb-3" />
                    <p className="text-center text-gray-600">No comment yet.</p>
                </div>
            )}
        </section>
    );
};
