import React from "react";
import InputGroup from "@/Components/InputGroup";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { IconAt, IconPassword, IconUser } from "@tabler/icons-react";

export default function Register() {
    const { data, setData, post, errors } = useForm({
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
    });

    function register(e) {
        e.preventDefault();

        post("/register");
    }

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <AuthLayout>
                <div className="w-full max-w-lg p-10 bg-white border rounded-lg">
                    <h1 className="mb-2 text-2xl font-semibold text-black">
                        Register
                    </h1>
                    <p className="mb-5 text-sm text-gray-500">
                        Silahkan login, jika anda sudah memiliki akun.
                    </p>
                    <form onSubmit={register}>
                        <div className="mb-5">
                            <InputGroup
                                label={"Name"}
                                type={"text"}
                                icon={
                                    <IconUser
                                        strokeWidth={"1.5"}
                                        className="text-gray-400"
                                    />
                                }
                                placeholder={"John Doe"}
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                errors={errors.name}
                            />
                        </div>
                        <div className="mb-5">
                            <InputGroup
                                label={"Email"}
                                type={"text"}
                                icon={
                                    <IconAt
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
                                    <IconPassword
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
                        <div className="mb-5">
                            <InputGroup
                                label={"Konfirmasi Kata Sandi"}
                                type={"password"}
                                icon={
                                    <IconPassword
                                        strokeWidth={"1.5"}
                                        className="text-gray-400"
                                    />
                                }
                                placeholder={"Secret..."}
                                value={data.passwordConfirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-6 py-2 duration-300 rounded-lg bg-sky-700 text-gray-50 hover:scale-110">
                                Daftar
                            </button>
                            <Link
                                href={"/login"}
                                className="px-6 py-2 duration-300 bg-gray-700 rounded-lg text-gray-50 hover:scale-110"
                                type="submit"
                            >
                                Masuk
                            </Link>
                        </div>
                    </form>
                </div>
            </AuthLayout>
        </>
    );
}
