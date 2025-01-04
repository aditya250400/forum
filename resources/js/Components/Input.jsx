export default function Input({ label, type, className, errors, ...props }) {
    return (
        <div className="flex flex-col gap-y-2">
            <label className="text-sm font-semibold text-gray-600">
                {label}
            </label>
            <input
                type={type}
                {...props}
                className={`w-full px-3 py-2 border bg-white text-sm rounded-md focus:outline-none focus:ring-0 text-gray-700 focus:border-sky-500 border-gray-200 ${className}`}
            />
            {errors && <small className="text-xs text-red-500">{errors}</small>}
        </div>
    );
}
