import InputGroup from "@/Components/InputGroup";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { IconLock, IconUser } from "@tabler/icons-react";

export default function Login() {
    const { data, setData, post, errors } = useForm({
        email: "",
        password: "",
    });

    function login(e) {
        e.preventDefaul();
        post("/login");
    }

    return (
        <>
            <Head title="Login" />
            <AuthLayout>
                <div className="w-full max-w-lg p-10 bg-white border rounded-lg">
                    <h1 className="mb-2 text-2xl font-semibold text-black">
                        Login
                    </h1>
                    <p className="mb-5 text-sm text-gray-500">
                        Selamat datang, masukan email dan kata sandi anda untuk
                        melanjutkan.
                    </p>
                    <form onSubmit={login}>
                        <div className="mb-5">
                            <InputGroup
                                label={"Email"}
                                type={"text"}
                                icon={
                                    <IconUser
                                        strokeWidth={"1.5"}
                                        className="text-gray-400"
                                    />
                                }
                                placeholder={"example@dev.com"}
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                errors={errors.email}
                            />
                        </div>
                        <div className="mb-5">
                            <InputGroup
                                label={"Kata Sandi"}
                                type={"password"}
                                icon={
                                    <IconLock
                                        strokeWidth={"1.5"}
                                        className="text-gray-400"
                                    />
                                }
                                placeholder={"Secret..."}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                errors={errors.password}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                className="px-6 py-2 duration-300 bg-gray-700 rounded-lg text-gray-50 hover:scale-110"
                                type="submit"
                            >
                                Masuk
                            </button>
                            <Link
                                href={"/register"}
                                className="px-6 py-2 duration-300 rounded-lg bg-sky-700 text-gray-50 hover:scale-110"
                            >
                                Daftar
                            </Link>
                        </div>
                    </form>
                </div>
            </AuthLayout>
        </>
    );
}
