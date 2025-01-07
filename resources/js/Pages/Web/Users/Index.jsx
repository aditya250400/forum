import React, { useState, useEffect } from "react";
import UserItem from "@/Components/UserItem";
import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage } from "@inertiajs/react";
import { IconChevronDown, IconLoader2 } from "@tabler/icons-react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

export default function Index() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/users?page=${page}`);

            setUsers([...users, ...response.data.data]);
            setLastPage(response.data.meta.last_page);
            setCurrentPage(response.data.meta.current_page);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <>
            <Head title="Users" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {users.map((user, i) => (
                    <UserItem user={user} key={i} />
                ))}
            </div>
            {loading ? (
                <div className="flex items-center justify-center mt-5">
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#030712"
                        ariaLabel="three-dots-loading"
                        visible={loading}
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center mt-4">
                    {lastPage != currentPage ? (
                        <button
                            onClick={loadMore}
                            className="flex items-center gap-1 px-4 py-2 font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-950"
                        >
                            Load More{" "}
                            <IconChevronDown
                                className="w-5 h-5"
                                strokeWidth={"1.5"}
                            />
                        </button>
                    ) : (
                        <h3 className="text-sm font-semibold text-center">
                            No More Data...
                        </h3>
                    )}
                </div>
            )}
        </>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
