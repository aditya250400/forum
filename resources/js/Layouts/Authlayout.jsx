/* eslint-disable react/prop-types */


export default function AuthLayout({children}) {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center  px-2 md:px-0">
            {children}
        </div>
    )
}
