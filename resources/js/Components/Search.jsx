import { useForm } from "@inertiajs/react";
import { IconSearch } from "@tabler/icons-react";

export default function Search({ url }) {
    const { data, setData, get } = useForm({ search: "" });

    function search(e) {
        e.preventDefault();

        get(`${url}`);

        return (
            <>
                <form onSubmit={search}>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={data.search}
                            onChange={(e) => setData("search", e.target.value)}
                            className="w-full px-4 py-2 text-sm text-gray-700 border border-r-0 border-gray-200 rounded-md rounded-r-none focus:ring-0 focus:border-sky-500"
                            placeholder="Search Threads Data..."
                        />
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-white duration-500 border rounded-lg rounded-l-none bg-slate-900 hover:bg-slate-950 group hover:transition-transform"
                        >
                            <IconSearch
                                size={"20"}
                                strokeWidth={"1.5"}
                                className={
                                    "group-hover:scale-110 group-hover:rotate-12 duration-500 text-gray-400 group-hover:text-gray-50"
                                }
                            />
                        </button>
                    </div>
                </form>
            </>
        );
    }
}
