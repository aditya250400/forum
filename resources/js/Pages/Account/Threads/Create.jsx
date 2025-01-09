import React from "react";
import Card from "@/Components/Card";
import Input from "@/Components/Input";
import MarkdownEditor from "@/Components/MarkdownEditor";
import MultiSelect from "@/Components/MultiSelect";
import Textarea from "@/Components/Textarea";
import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { IconPencilPlus } from "@tabler/icons-react";
import { toast } from "react-hot-toast";
export default function Create() {
    // define construct props
    const { tags } = usePage().props;

    // define useform helper inertia
    const { data, setData, post, transform, errors } = useForm({
        title: "",
        content: "",
        tagsData: [],
        description: "",
    });

    // get content value
    const setContent = (value) => {
        setData("content", value);
    };

    // get tags value
    const setTags = (value) => {
        setData("tagsData", value);
    };

    // transform data before submit
    transform((data) => ({
        ...data,
        tags: data.tagsData.map((tag) => tag.label),
    }));

    // define method submit
    function submit(e) {
        e.preventDefault();

        post("/account/threads", {
            onSuccess: () => {
                toast.success("Thread Berhasil Dibuat!", {
                    icon: "👏",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
            },
        });
    }

    return (
        <>
            <Head title="Create Threads" />
            <div className="flex justify-center gap-4">
                <div className="w-full sm:w-8/12">
                    <Card
                        title={"Create New Threads"}
                        icon={
                            <IconPencilPlus
                                strokeWidth={"1.5"}
                                className="w-5 h-5"
                            />
                        }
                        action={submit}
                        btnTitle={"Create Threads"}
                        href={"/threads"}
                    >
                        <div className="mb-5">
                            <Input
                                label={"Title"}
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                errors={errors.title}
                            />
                        </div>
                        <div className="mb-5">
                            <Textarea
                                label={"Description"}
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                errors={errors.description}
                            />
                        </div>
                        <div className="mb-5">
                            <MultiSelect
                                label={"Tags"}
                                options={tags}
                                value={data.tagsData}
                                onChange={setTags}
                                errors={errors.tags}
                            />
                        </div>
                        <div className="mb-5">
                            <MarkdownEditor
                                label={"Content"}
                                value={data.content}
                                onChange={setContent}
                                errors={errors.content}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

Create.layout = (page) => <MainLayout children={page} />;
