import React, { useState } from "react";
import Delete from "@/Components/Delete";
import Modal from "@/Components/Modal";
import CommentItems from "@/Components/CommentItems";
import UserItem from "@/Components/UserItem";
import Markdown from "@/Components/Markdown";
import MarkdownEditor from "@/Components/MarkdownEditor";
import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    IconMessage2Plus,
    IconPencilCancel,
    IconPencilCheck,
    IconPencil,
    IconMessage2,
    IconCalendar,
    IconCircleCheck,
    IconProgressCheck,
} from "@tabler/icons-react";
import toast from "react-hot-toast";

export default function Show() {
    const { thread, comments, auth } = usePage().props;

    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState("");
    const [formUpdate, setFormUpdate] = useState(false);
    const { data, setData, post, reset, transform } = useForm({
        content: "",
    });

    transform((data) => ({ ...data, _method: formUpdate ? "put" : "post" }));

    const setContent = (value) => {
        setData("content", value);
    };

    const store = (e) => {
        e.preventDefault();
        post(`/account/comments/${thread.id}`, {
            onSuccess: () => {
                reset(), setIsOpen(false);
                toast.success("Komentar Berhasil Dibuat!", {
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

    const update = async (e) => {
        e.preventDefault();

        post(`/account/comments/${id}`, {
            onSuccess: () => {
                setIsOpen(!isOpen);
                setFormUpdate(!formUpdate),
                    setId(""),
                    reset(),
                    toast.success("Komentar Berhasil Diubah!", {
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
        <>
            <Head title={thread.slug} />
            <MainLayout>
                <div className="flex flex-col-reverse gap-5 md:flex-row">
                    <div className="w-full md:w-8/12">
                        <div className="bg-white rounded-lg">
                            <div className="px-6 py-3 border-b">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={thread.user.avatar}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="text-sm font-semibold text-gray-900">
                                        {thread.user.username}
                                    </span>
                                </div>
                            </div>
                            <div className="px-6 py-4">
                                <h1 className="font-semibold text-gray-900 underline underline-offset-2">
                                    {thread.title}
                                </h1>
                                <div className="mt-5 text-sm text-justify">
                                    <Markdown>{thread.content}</Markdown>
                                </div>
                            </div>
                            <div className="px-6 py-3 border-t border-gray-200">
                                <div className="flex flex-wrap items-center justify-start gap-4 lg:justify-end">
                                    <div className="flex items-center gap-1 text-sm">
                                        <IconMessage2
                                            className="w-5 h-5"
                                            strokeWidth={"1.5"}
                                        />
                                        {thread.comments_count} Comments
                                    </div>
                                    <div className="flex items-center gap-1 text-sm capitalize">
                                        {thread.status == "resolved" ? (
                                            <IconCircleCheck
                                                className="w-5 h-5"
                                                strokeWidth={"1.5"}
                                            />
                                        ) : (
                                            <IconProgressCheck
                                                className="w-5 h-5"
                                                strokeWidth={"1.5"}
                                            />
                                        )}
                                        {thread.status}
                                    </div>
                                    <div className="flex items-center gap-1 text-sm">
                                        <IconCalendar
                                            className="w-5 h-5"
                                            strokeWidth={"1.5"}
                                        />
                                        {thread.comments.length
                                            ? thread.comments[
                                                  thread.comments.length - 1
                                              ].created_at
                                            : "-"}{" "}
                                        / Last Comment
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 mt-5">
                            {comments.map((comment, i) => (
                                <CommentItems
                                    comment={comment}
                                    thread={thread}
                                    key={i}
                                >
                                    {comment.user_id == auth.user.id && (
                                        <>
                                            <button
                                                onClick={() => (
                                                    setId(comment.id),
                                                    setData(
                                                        "content",
                                                        comment.content,
                                                    ),
                                                    setIsOpen(!isOpen),
                                                    setFormUpdate(true)
                                                )}
                                                className="p-1 border rounded-full bg-sky-100 border-sky-100 hover:bg-sky-200"
                                            >
                                                <IconPencil
                                                    className="w-5 h-5 text-sky-500"
                                                    strokeWidth={"1.5"}
                                                />
                                            </button>
                                            {comment.id != thread.solved && (
                                                <Delete
                                                    url={"/account/comments"}
                                                    id={comment.id}
                                                />
                                            )}
                                        </>
                                    )}
                                </CommentItems>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-4/12">
                        <div className="sticky top-20">
                            <button
                                className="flex items-center justify-start w-full gap-2 px-3 py-2 font-bold text-gray-700 bg-white rounded-lg hover:bg-gray-300"
                                onClick={() => {
                                    setIsOpen(true);
                                }}
                            >
                                <IconMessage2Plus
                                    strokeWidth={"1.5"}
                                    className="w-6 h-6"
                                />
                                Comment Thread
                            </button>
                            <Modal
                                isOpen={isOpen}
                                open={isOpen}
                                onClose={() =>
                                    formUpdate == true
                                        ? (setIsOpen(false),
                                          setFormUpdate(false),
                                          setData("content", ""),
                                          setId(""))
                                        : setIsOpen(false)
                                }
                            >
                                <form
                                    onSubmit={
                                        formUpdate == true ? update : store
                                    }
                                >
                                    <MarkdownEditor
                                        label={
                                            formUpdate == true
                                                ? "Update your comment"
                                                : "Write your comment"
                                        }
                                        value={data.content}
                                        onChange={setContent}
                                    />
                                    <div className="flex items-center gap-2 mt-5">
                                        <button
                                            type="submit"
                                            className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg bg-sky-700 text-gray-50 hover:bg-sky-800"
                                        >
                                            <IconPencilCheck
                                                strokeWidth={"1.5"}
                                                className="w-5 h-5"
                                            />{" "}
                                            Save Comment
                                        </button>
                                        <button
                                            className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg bg-rose-700 text-gray-50 hover:bg-rose-800"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            <IconPencilCancel
                                                strokeWidth={"1.5"}
                                                className="w-5 h-5"
                                            />{" "}
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </Modal>
                            <div className="mt-5">
                                <UserItem user={thread.user} />
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}
