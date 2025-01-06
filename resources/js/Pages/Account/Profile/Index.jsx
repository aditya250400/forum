import React, { useState } from "react";
import Pagination from "@/Components/Pagination";
import InputGroup from "@/Components/InputGroup";
import Search from "@/Components/Search";
import UserItem from "@/Components/UserItem";
import Logout from "@/Components/Logout";
import ThreadCard from "@/Components/ThreadCard";
import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage, useForm, Link } from "@inertiajs/react";
import {
    IconPencilCancel,
    IconPencilCog,
    IconPencilPlus,
    IconUserCircle,
    IconUser,
    IconPassword,
} from "@tabler/icons-react";
import { toast } from "react-hot-toast";
export default function Index() {
    // desturct props
    const { user, threads } = usePage().props;

    // define useform helper inertia
    const { data, setData, post, errors } = useForm({
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: "",
        password: "",
        password_confirmation: "",
        _method: "put",
    });

    // define state from react
    const [showForm, setShowForm] = useState(false);

    // define method update profile
    const profile = async (e) => {
        e.preventDefault();

        post(`/account/profile/${user.id}`, {
            onSuccess: () => {
                toast.success("Profile Berhasil Diupdate!", {
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
            <Head title="Profile" />
            <div className="flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-4/12">
                    <UserItem user={user} />
                    <div className="mt-5">
                        {showForm && (
                            <form onSubmit={profile}>
                                <div className="bg-white rounded-lg mb-5">
                                    <div className="border-b px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <IconUserCircle
                                                className="w-6 h-6 text-gray-700"
                                                strokeWidth={"1.5"}
                                            />
                                            <h1 className="font-bold text-gray-700">
                                                Profile Information
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="px-5 py-4">
                                        <div className="mb-5">
                                            <InputGroup
                                                icon={
                                                    <IconUser
                                                        strokeWidth={"1.5"}
                                                        className="w-5 h-5 text-gray-500"
                                                    />
                                                }
                                                label={"Name"}
                                                type={"text"}
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                errors={errors.name}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputGroup
                                                icon={
                                                    <IconUser
                                                        strokeWidth={"1.5"}
                                                        className="w-5 h-5 text-gray-500"
                                                    />
                                                }
                                                label={"Avatar"}
                                                type={"file"}
                                                onChange={(e) =>
                                                    setData(
                                                        "avatar",
                                                        e.target.files[0],
                                                    )
                                                }
                                                errors={errors.username}
                                                readonly
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputGroup
                                                icon={
                                                    <IconPassword
                                                        strokeWidth={"1.5"}
                                                        className="w-5 h-5 text-gray-500"
                                                    />
                                                }
                                                label={"Kata Sandi"}
                                                value={data.password}
                                                type={"password"}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value,
                                                    )
                                                }
                                                errors={errors.password}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <InputGroup
                                                icon={
                                                    <IconPassword
                                                        strokeWidth={"1.5"}
                                                        className="w-5 h-5 text-gray-500"
                                                    />
                                                }
                                                label={"Konfirmasi Kata Sandi"}
                                                value={
                                                    data.password_confirmation
                                                }
                                                type={"password"}
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value,
                                                    )
                                                }
                                                errors={
                                                    errors.password_confirmation
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full bg-white rounded-lg px-3 py-2 font-bold text-gray-800 mb-2 hover:bg-gray-300 flex items-center gap-2 justify-start">
                                    <IconPencilPlus
                                        strokeWidth={"1.5"}
                                        className="w-6 h-6"
                                    />
                                    Update Profile
                                </button>
                            </form>
                        )}
                        {!showForm ? (
                            <button
                                className="w-full bg-white rounded-lg px-3 py-2 font-bold text-gray-700 flex items-center gap-2 justify-start hover:bg-gray-300"
                                onClick={() => {
                                    setShowForm(!showForm);
                                }}
                            >
                                <IconPencilCog
                                    strokeWidth={"1.5"}
                                    className="w-6 h-6"
                                />
                                Update Profile
                            </button>
                        ) : (
                            <button
                                className="w-full bg-gray-700 rounded-lg px-3 py-2 font-bold text-gray-50 hover:bg-gray-800 flex items-center gap-2 justify-start"
                                onClick={() => {
                                    setShowForm(!showForm);
                                }}
                            >
                                <IconPencilCancel
                                    strokeWidth={"1.5"}
                                    className="w-6 h-6"
                                />
                                Cancel
                            </button>
                        )}
                        {!showForm && (
                            <>
                                <Link
                                    className="w-full bg-green-200 rounded-lg px-3 py-2 font-bold text-green-800 flex items-center gap-2 justify-start mt-5 hover:bg-green-300"
                                    href="/account/threads/create"
                                >
                                    <IconPencilPlus
                                        strokeWidth={"1.5"}
                                        className="w-6 h-6"
                                    />
                                    Start new Threads
                                </Link>
                                <Logout />
                            </>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-8/12">
                    <div className="mb-5">
                        <div className="flex items-center justify-between gap-2">
                            <div className="p-2">
                                <h1 className="text-lg font-bold text-[#0084C7]">
                                    Threads
                                </h1>
                                <p className="text-sm text-gray-500">
                                    kumpulan threads yang saya buat
                                </p>
                            </div>
                            <div className="py-2 px-4 bg-white rounded-md">
                                {user.threads_count} Threads
                            </div>
                        </div>
                        <div className="mt-2">
                            <Search url={`/account/profile/${user.username}`} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                        {threads.data.map((thread, i) => (
                            <ThreadCard thread={thread} key={i} />
                        ))}
                    </div>
                    {threads.last_page !== 1 && (
                        <Pagination links={threads.meta.links} />
                    )}
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
