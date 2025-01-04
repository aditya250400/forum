import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { IconCircleCheck } from "@tabler/icons-react";
import toast from "react-hot-toast";
import Markdown from "./Markdown";

export default function CommentItems({ comment, thread, children }) {
    const { auth } = usePage().props;

    const { post } = useForm({
        _method: "put",
    });

    const store = async (e) => {
        e.preventDefault();

        post(`/account/comments/${thread.id}/solution/${comment.id}`, {
            onSuccess: () => {
                toast.success("Komentar Terbaik Disimpan!", {
                    icon: "👏",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
            },
        });
    };

    return (
        <div
            className={`${thread.solved == comment.id ? "border border-teal-500" : ""} bg-white rounded-lg`}
        >
            <div className="px-6 py-3 border-b">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <img
                            src={comment.user.avatar}
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-semibold text-gray-900">
                            {comment.user.username}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">{children}</div>
                </div>
            </div>
            <div className="px-6 py-4">
                <Markdown>{comment.content}</Markdown>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-3">
                {thread.solved == comment.id && (
                    <div className="flex items-center gap-1 px-4 py-1 text-sm text-white bg-teal-500 rounded-lg">
                        <IconCircleCheck
                            strokeWidth={"1.5"}
                            className="w-5 h-5"
                        />{" "}
                        Solution
                    </div>
                )}
                {auth.user.id == thread.user.id && (
                    <form onSubmit={store}>
                        <button className="flex items-center gap-1 px-3 py-1 text-sm text-white rounded-lg bg-sky-500">
                            <IconCircleCheck
                                strokeWidth={"1.5"}
                                className="w-5 h-5"
                            />{" "}
                            Mark as Solution
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
