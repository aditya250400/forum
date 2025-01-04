import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    IconBell,
    IconBellPlus,
    IconNotes,
    IconUsers,
} from "@tabler/icons-react";
import logo from "../assets/images/social.png";
import Dropdown from "./Dropdown";
export default function Navbar() {
    const { auth } = usePage().props;
    const { url } = usePage();

    const activeThreads = url.startsWith("/threads")
        ? "border-b-sky-300 border-b-2"
        : "";
    const activeUsers = url.startsWith("/users")
        ? "border-b-sky-300 border-b-2"
        : "";
    const activeNotifications = url.startsWith("/account/notifications")
        ? "border-b-sky-300 border-b-2"
        : "";
    const activeProfile = url.startsWith("/account/profile")
        ? "border-b-sky-300 border-b-2"
        : "";

    return (
        <div className="fixed top-0 z-30 w-full bg-white border-b">
            <div className="max-w-screen-lg px-2 mx-auto sm:px-4 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        href={"/threads"}
                        className="flex items-center gap-2 font-bold text-gray-900"
                    >
                        <img src={logo} alt="logo" className="w-10 h-10" />
                        FORUM
                    </Link>
                    <div className="items-center hidden gap-3 lg:flex">
                        <Link
                            href="/threads"
                            className={`flex items-center px-4 py-2 gap-2 hover:border-b-2 hover:border-b-sky-300 ${activeThreads}`}
                        >
                            <IconNotes
                                className="w-5 h-5"
                                strokeWidth={"1.5"}
                            />{" "}
                            Threads
                        </Link>
                        <Link
                            href="/users"
                            className={`flex items-center px-4 py-2 gap-2 hover:border-b-2 hover:border-b-sky-300 ${activeUsers}`}
                        >
                            <IconUsers
                                className="w-5 h-5"
                                strokeWidth={"1.5"}
                            />{" "}
                            Users
                        </Link>
                        <Link
                            href="/account/notifications"
                            className={`flex items-center px-4 py-2 gap-2 hover:border-b-2 hover:border-b-sky-300 ${activeNotifications}`}
                        >
                            {auth.user.notification_unreads > 0 ? (
                                <>
                                    <IconBellPlus
                                        className="w-5 h-5 text-rose-500"
                                        strokeWidth={"1.5"}
                                    />
                                    <span>
                                        {auth.user.notification_unreads}{" "}
                                        Notifications
                                    </span>
                                </>
                            ) : (
                                <>
                                    <IconBell
                                        className="w-5 h-5"
                                        strokeWidth={"1.5"}
                                    />
                                    <span>Notifications</span>
                                </>
                            )}
                        </Link>
                        <Link
                            href={`/account/profile/${auth.user.username}`}
                            className={`flex items-center px-4 py-2 gap-2 hover:border-b-2 hover:border-b-sky-300 ${activeProfile}`}
                        >
                            <img
                                src={auth.user.avatar}
                                className="w-5 h-5 rounded-full"
                            />
                            <span className="line-clamp-1">
                                {auth.user.name}
                            </span>
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <Dropdown auth={auth} />
                    </div>
                </div>
            </div>
        </div>
    );
}
