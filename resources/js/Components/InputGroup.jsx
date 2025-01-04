export default function InputGroup({
    label,
    icon,
    type,
    placeholder,
    errors,
    ...props
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500">{label}</label>
            <div className="flex">
                <span className="flex items-center px-3 bg-gray-100 border border-r-0 sm:text-sm rounded-l-md">
                    {icon}
                </span>
                <input
                    type={type}
                    className="w-full px-3 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-r-md sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-sky-500"
                    {...props}
                />
            </div>
            {errors && (
                <small className="text-sm text-rose-500">{errors}</small>
            )}
        </div>
    );
}
