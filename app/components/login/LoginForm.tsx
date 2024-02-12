"use client";

import { authFetchClient } from "@/app/lib/authFetch";
import { Card, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { Field, FieldValues, useForm } from "react-hook-form";

export default function LoginForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const loginUser = handleSubmit(async (data: FieldValues) => {

        

        console.log(data);
        debugger;
        reset();
        return;
    });

    const registerUser = handleSubmit(async (data: FieldValues) => {
        console.log(data);
        debugger;
        reset();
        return;
    });

    // const login = async () => {
    //     const { user, pass } = { user: process.env.NEXT_PUBLIC_TEMP_USER, pass: process.env.NEXT_PUBLIC_TEMP_PASS };
    //     try {
    //         const response = await authFetchClient("/login", {
    //             body: {
    //                 username: user,
    //                 password: pass,
    //             },
    //         });
    //         if (!response?.data.error) {
    //             router.push("/");
    //         }
    //     } catch (err) {
    //         debugger;
    //         console.log(err);
    //     }
    // };

    return (
        <Card className="p-6 m-6 w-[400px] max-w-[400px] drop-shadow-2xl">
            <form>
                <h3 className="mb-5 mt-0">Welcome to Twitter.</h3>
                <TextField
                    {...register("username", {
                        required: "Username is required.",
                        minLength: {
                            value: 4,
                            message: "Username must be at least 4 characters.",
                        },
                        maxLength: {
                            value: 25,
                            message: "Username can be up to 25 characters.",
                        },
                    })}
                    size="small"
                    label="Username"
                    variant="outlined"
                    error={!!errors.username}
                    helperText={errors.username?.message as string}
                    className="w-full mb-4 "
                />
                <TextField
                    {...register("password", {
                        required: "Password is required.",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters.",
                        },
                        maxLength: {
                            value: 25,
                            message: "Password can be up to 25 characters.",
                        },
                    })}
                    size="small"
                    label="Password"
                    type="password"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message as string}
                    className="w-full mb-6"
                />
                <div className="w-full flex justify-center items-center">
                    <Button
                        onClick={() => registerUser()}
                        variant="outlined"
                        size="small"
                        className="mx-4 min-w-[100px] border-black text-black"
                    >
                        Register
                    </Button>
                    <Button
                        onClick={() => loginUser()}
                        variant="outlined"
                        size="small"
                        className="mx-4 min-w-[100px] border-black text-black"
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
}
