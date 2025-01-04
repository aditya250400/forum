import React from "react";
import { useForm } from "@inertiajs/react";
import { IconLogout } from "@tabler/icons-react";
export default function Logout() {
    const { post } = useForm();

    const logout = async (e) => {
        e.preventDefault();

        post("/logout");
    };
    return (
        <button
            className="flex items-center justify-start w-full gap-2 px-3 py-2 mt-5 font-bold rounded-lg bg-rose-200 text-rose-500 hover:bg-rose-300"
            onClick={logout}
        >
            <IconLogout strokeWidth={"1.5"} className="w-6 h-6" />
            Logout
        </button>
    );
}
