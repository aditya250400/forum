/* eslint-disable react/prop-types */
export default function Textarea({ label, className, errors, children, ...props }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="text-gray-600 text-sm font-semibold">{label}</label>
        <textarea
          className={`w-full text-sm rounded-md bg-white focus:outline-none focus:ring-0 text-gray-700 focus:border-sky-500 border-gray-200 ${className}`}
          rows={'4'}
          {...props}>
          {children}
        </textarea>
        {errors && <small className="text-xs text-red-500 text-underline">{errors}</small>}
      </div>
    </>
  );
}
