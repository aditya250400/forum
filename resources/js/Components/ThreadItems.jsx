import React from "react";
import { Link } from "@inertiajs/react";
import {
    IconCircleCheck,
    IconEye,
    IconMessage,
    IconProgressCheck,
} from "@tabler/icons-react";

export default function ThreadItems({ thread }) {
    return (
        <div
            className={`bg-white rounded-lg border ${thread.solved !== null ? "border-teal-400" : ""}`}
        >
            <div className="px-6 py-3 border-b">
                <div className="flex items-center justify-between gap-10">
                    <div className="flex items-center gap-2">
                        <img
                            src={thread.user.avatar}
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-semibold text-gray-900">
                            {thread.user.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                        {thread.created_at}
                    </div>
                </div>
            </div>
            <div className="px-6 py-4">
                <div className="flex items-center gap-2 mb-6">
                    {thread.tags.map((tag, i) => (
                        <Link
                            href={`/threads/tags/${tag.slug}`}
                            className="capitalize px-3 py-0.5 border border-slate-200 bg-blue-100 text-gray-700 text-xs rounded-sm font-semibold"
                            key={i}
                        >
                            {tag.label}
                        </Link>
                    ))}
                </div>
                <Link
                    href={`/threads/${thread.slug}`}
                    className="text-base font-bold text-gray-900 hover:text-sky-500"
                >
                    {thread.title}
                </Link>
                <p className="mt-4 text-sm line-clamp-2">
                    {thread.description}
                </p>
            </div>
            <div className="px-6 py-3 border-t border-gray-200">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex items-center gap-1 py-1 text-sm text-gray-700">
                        <IconEye strokeWidth={"1.5"} className="w-4 h-4" />{" "}
                        {thread.visit_count_total}x Dilihat
                    </div>
                    <div className="flex items-center gap-1 py-1 text-sm text-gray-700">
                        <IconMessage strokeWidth={"1.5"} className="w-4 h-4" />{" "}
                        {thread.comments} Balasan
                    </div>
                    <div className="flex items-center gap-1 py-1 text-sm text-gray-700">
                        {thread.solved === null ? (
                            <>
                                <IconProgressCheck
                                    strokeWidth={"1.5"}
                                    className="w-4 h-4"
                                />{" "}
                                Unresolved
                            </>
                        ) : (
                            <>
                                <IconCircleCheck
                                    strokeWidth={"1.5"}
                                    className="w-4 h-4"
                                />{" "}
                                Resolved
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
