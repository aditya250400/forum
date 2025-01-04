import React from "react";
import { Link } from "@inertiajs/react";

export default function UserItem({ user }) {
    return (
        <div className="bg-white rounded-lg">
            <div className="flex flex-col items-center justify-center gap-4 p-6 py-4 text-center">
                <img src={user.avatar} className="w-20 h-20 rounded-full" />
                <div>
                    <Link
                        href={`/users/${user.username}`}
                        className="font-bold text-center text-gray-700"
                    >
                        {user.name}
                    </Link>
                    <div className="mt-2 text-xs font-semibold text-center text-gray-600">
                        @{user.username}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-6 p-2 border-t-2 border-gray-50">
                    <div className="flex flex-col gap-1 text-center">
                        <div className="text-sm font-semibold text-gray-600">
                            Threads
                        </div>
                        <div className="text-lg text-[#0084C7] font-bold">
                            {user.threads}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-center">
                        <div className="text-sm font-semibold text-gray-600">
                            Resolved
                        </div>
                        <div className="text-lg text-[#0084C7] font-bold">
                            {user.resolved}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-center">
                        <div className="text-sm font-semibold text-gray-600">
                            Comments
                        </div>
                        <div className="text-lg text-[#0084C7] font-bold">
                            {user.comments}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
