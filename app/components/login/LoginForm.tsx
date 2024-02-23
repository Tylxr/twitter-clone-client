"use client";

import { authFetchClient } from "@/app/lib/authFetch";
import { setUser } from "@/app/store/app/appSlice";
import { useAppDispatch } from "@/app/store/hooks";
import { faChevronRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { FieldValues, useForm } from "react-hook-form";

export default function LoginForm() {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const router = useRouter();
    const loginError = (message?: string) => {
        enqueueSnackbar(message || "Oops, something went wrong.", { variant: "error" });
    };

    // Login functionality
    const loginUser = handleSubmit(async (data: FieldValues) => await login(data.username, data.password));
    const login = async (username: string, password: string) => {
        username = username.toLowerCase();
        try {
            const loginResponse = await authFetchClient("/login", {
                body: {
                    username: username,
                    password: password,
                },
            });
            if (!loginResponse || loginResponse.data.error) {
                return loginError(loginResponse?.data.errorMessage);
            }
            dispatch(setUser(username));
            return router.push("/");
        } catch (err) {
            console.error(err);
            return loginError();
        }
    };

    // Register functionality
    const registerUser = handleSubmit(async (data: FieldValues) => {
        try {
            const registerResponse = await authFetchClient("/register", {
                body: {
                    username: data.username,
                    password: data.password,
                },
            });
            if (!registerResponse || registerResponse.data.error) {
                return loginError(registerResponse?.data.errorMessage);
            }

            // Success... login!
            await login(data.username, data.password);
        } catch (err) {
            console.error(err);
            return loginError();
        }
    });

    return (
        <SnackbarProvider autoHideDuration={3000}>
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                            disabled={isSubmitting}
                            size="small"
                            endIcon={<FontAwesomeIcon icon={faChevronUp} className="w-4" />}
                            className="mx-4 min-w-[120px] border-black text-black"
                        >
                            Register
                        </Button>
                        <Button
                            onClick={() => loginUser()}
                            variant="outlined"
                            disabled={isSubmitting}
                            size="small"
                            className="mx-4 min-w-[120px] border-black text-black"
                            endIcon={<FontAwesomeIcon icon={faChevronRight} className="w-4" />}
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </Card>
        </SnackbarProvider>
    );
}
