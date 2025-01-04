import React from "react";
import { Link } from "@inertiajs/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";

export default function Pagination({ links }) {
    return (
        <>
            <ul className="flex items-center justify-end gap-1 mt-2 lg:mt-5">
                {links.map((item, i) => {
                    return item.url != null ? (
                        item.label.includes("Previous") ? (
                            <Link
                                className="p-1 text-sm text-gray-500 bg-white border rounded-md hover:bg-sky-100"
                                key={i}
                                href={item.url}
                            >
                                <IconChevronLeft
                                    size={"20"}
                                    strokeWidth={"1.5"}
                                />
                            </Link>
                        ) : item.label.includes("Next") ? (
                            <Link
                                className="p-1 text-sm text-gray-500 bg-white border rounded-md hover:bg-sky-100"
                                key={i}
                                href={item.url}
                            >
                                <IconChevronRight
                                    size={"20"}
                                    strokeWidth={"1.5"}
                                />
                            </Link>
                        ) : (
                            <Link
                                className={`px-2 py-1 text-sm border rounded-md text-gray-500 hover:bg-sky-100 ${item.active ? "bg-sky-200 text-gray-700" : "bg-white"}`}
                                key={i}
                                href={item.url}
                            >
                                {item.label}
                            </Link>
                        )
                    ) : null;
                })}
            </ul>
        </>
    );
}
