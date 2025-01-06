import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    IconBell,
    IconBellCheck,
    IconBellPlus,
    IconCheck,
    IconCircleCheck,
    IconClock,
    IconDatabaseOff,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
export default function Index() {
    // destruct props
    const { notifications } = usePage().props;

    // define useform helper inertia
    const { post } = useForm();

    // define method read notification
    const markAsRead = async (e) => {
        e.preventDefault();

        post("/account/notifications/read", {
            onSuccess: () => {
                toast.success("Notifikasi Sudah Dibaca!", {
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
            <Head title="Notifications" />
            <div className="bg-white rounded-lg">
                <div className="border-b px-6 py-3">
                    <div className="flex justify-between gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <IconBell strokeWidth={"1.5"} className="w-5 h-5" />
                            <h1 className="font-semibold text-gray-900">
                                Notifications
                            </h1>
                        </div>
                        <div className="font-semibold text-gray-900">
                            {notifications.length} Notifications
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4">
                    <div
                        className={`flex flex-col divide-y space-y-2 divide-dashed overflow-auto scrollbar-hide ${notifications.length > 4 ? "h-60" : ""}`}
                    >
                        {notifications.length ? (
                            notifications.map((notification, i) => (
                                <div
                                    className="flex items-center gap-4 py-2"
                                    key={i}
                                >
                                    {notification.is_read == "0" ? (
                                        <IconBellPlus
                                            strokeWidth={"1.5"}
                                            className="w-12 h-12 md:w-5 md:h-5 text-green-600"
                                        />
                                    ) : (
                                        <IconBellCheck
                                            strokeWidth={"1.5"}
                                            className="w-12 h-12 md:w-5 md:h-5 text-yellow-600"
                                        />
                                    )}
                                    <div>
                                        <Link
                                            href={`/threads/${notification.thread.slug}`}
                                            className="hover:text-sky-600"
                                        >
                                            {notification.from_user.name}{" "}
                                            {notification.messages}
                                        </Link>
                                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                            <IconClock
                                                className="w-4 h-4"
                                                strokeWidth={"1.5"}
                                            />
                                            {notification.created_at}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center h-screen">
                                <div className="flex flex-col items-center justify-center">
                                    <IconDatabaseOff
                                        className="w-8 h-8 text-rose-500"
                                        strokeWidth={"1.5"}
                                    />
                                    <span className="text-rose-500 underline font-semibold">
                                        Notifications not found
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {notifications.length > 0 && (
                <button
                    onClick={markAsRead}
                    className="bg-sky-500 px-4 py-1 font-semibold text-gray-50 rounded-lg flex items-center gap-1 mt-5"
                >
                    <IconCheck className="w-5 h-5" strokeWidth={"1.5"} />
                    Mark as Read
                </button>
            )}
        </>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
