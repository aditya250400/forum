import React from "react";
import MDEditor from "@uiw/react-md-editor";
export default function MarkdownEditor({ label, errors, ...props }) {
    return (
        <div className="flex flex-col gap-2" data-color-mode="light">
            <label className="text-sm font-semibold text-gray-600">
                {label}
            </label>
            <MDEditor preview="edit" visibleDragbar={false} {...props} />
            {errors && <small className="text-xs text-red-500">{errors}</small>}
        </div>
    );
}
