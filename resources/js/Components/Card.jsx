import { Link } from "@inertiajs/react";
import { IconPencilCancel, IconPencilCheck } from "@tabler/icons-react";

export default function Card({
    title,
    action,
    icon,
    btnTitle,
    href,
    children,
}) {
    return (
        <div className="bg-white rounded-lg">
            <div className="px-6 py-3 border-b">
                <div className="flex items-center gap-2">
                    {icon}
                    <h1 className="font-semibold text-gray-900">{title}</h1>
                </div>
            </div>
            <form onSubmit={action}>
                <div className="px-6 py-4">{children}</div>
                <div className="px-6 py-3 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                        <button
                            type="submit"
                            className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg bg-sky-700 text-gray-50 hover:bg-sky-800"
                        >
                            <IconPencilCheck
                                strokeWidth={"1.5"}
                                className="w-5 h-5"
                            />{" "}
                            {btnTitle}
                        </button>
                        <Link
                            href={href}
                            className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg bg-rose-700 text-gray-50 hover:bg-rose-800"
                        >
                            <IconPencilCancel
                                strokeWidth={"1.5"}
                                className="w-5 h-5"
                            />{" "}
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
