import React from "react";
import { useForm } from "@inertiajs/react";
import { Menu } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import {
    IconLogout,
    IconNotes,
    IconUserCircle,
    IconBell,
    IconBellPlus,
    IconUsers,
} from "@tabler/icons-react";
export default function Dropdown({ auth }) {
    const { post } = useForm();

    const logout = async (e) => {
        e.preventDefault();

        post("/logout");
    };

    return (
        <Menu className="relative z-30" as="div">
            <Menu.Button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-200 rounded-lg">
                <img
                    src={auth.user.avatar}
                    alt={auth.user.name}
                    className="w-6 h-6 border rounded-full border-sky-500"
                />
                <span className="line-clamp-1">{auth.user.name}</span>
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-50 w-48 py-1 mt-2 font-normal bg-gray-100 border border-gray-200 rounded-lg">
                <Menu.Item>
                    <Link
                        href="/threads"
                        className="flex items-center gap-2 p-3 text-sm text-gray-700 rounded-lg hover:text-sky-700"
                    >
                        <IconNotes className="w-5 h-5" strokeWidth={"1.5"} />
                        <span className="ml-2">Threads</span>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link
                        href="/users"
                        className="flex items-center gap-2 p-3 text-sm text-gray-700 rounded-lg hover:text-sky-700"
                    >
                        <IconUsers className="w-5 h-5" strokeWidth={"1.5"} />
                        <span className="ml-2">Users</span>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link
                        href="/account/notifications"
                        className="flex items-center gap-2 p-3 text-sm text-gray-700 rounded-lg hover:text-sky-700"
                    >
                        {auth.user.notification_unreads > 0 ? (
                            <>
                                <IconBellPlus
                                    className="w-5 h-5 text-rose-500"
                                    strokeWidth={"1.5"}
                                />
                                <span className="ml-2">
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
                                <span className="ml-2">Notifications</span>
                            </>
                        )}
                    </Link>
                </Menu.Item>
                <Menu.Item className="border-b border-dashed">
                    <Link
                        href={`/account/profile/${auth.user.username}`}
                        className="flex items-center gap-2 p-3 text-sm text-gray-700 rounded-lg hover:text-sky-700"
                    >
                        <IconUserCircle
                            className="w-5 h-5"
                            strokeWidth={"1.2"}
                        />
                        <span className="ml-2">Profile</span>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 p-3 text-sm text-gray-700 rounded-lg hover:text-sky-700"
                    >
                        <IconLogout className="w-5 h-5" strokeWidth={"1.2"} />
                        <span className="ml-2">Logout</span>
                    </button>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
}
