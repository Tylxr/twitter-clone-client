"use client";

import { Card, Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authApi } from "../lib/api";

export default function Page() {
    const token = useAppSelector(({ auth }) => auth.token);
    const dispatch = useAppDispatch();

    const login = async () => {
        // dispatch(updateToken("new test token"));

        try {
            const response = await authApi().post("/login", {
                username: "",
                password: "",
            });
            debugger;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-screen h-screen">
            <div className="bg-black-gradient sm:bg-red-500 h-full w-full text-white flex flex-row justify-between items-center">
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center cursor-default hover:text-gray-200">
                        <h1 className="text-[70px] m-0" style={{ fontFamily: "Roboto-700" }}>
                            Twitter
                        </h1>
                        <p className="text-lg m-0 italic" style={{ fontFamily: "Roboto-300" }}>
                            Join the conversation.
                        </p>
                        <p>The token: {token}</p>
                    </div>
                    <Card className="p-6 m-6 sm:w-[400px] drop-shadow-2xl">
                        <h3 className="mb-5 mt-0">Welcome to Twitter.</h3>
                        <TextField
                            id="outlined-basic"
                            size="small"
                            label="Username"
                            variant="outlined"
                            className="w-full mb-4 "
                        />
                        <TextField
                            id="outlined-basic"
                            size="small"
                            label="Password"
                            type="password"
                            variant="outlined"
                            className="w-full mb-6"
                        />
                        <div className="w-full flex justify-center items-center">
                            <Button
                                variant="outlined"
                                size="small"
                                className="mx-4 min-w-[100px] border-black text-black"
                            >
                                Register
                            </Button>
                            <Button
                                onClick={() => login()}
                                variant="outlined"
                                size="small"
                                className="mx-4 min-w-[100px] border-black text-black"
                            >
                                Login
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
