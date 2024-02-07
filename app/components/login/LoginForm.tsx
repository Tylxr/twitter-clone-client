"use client";

import { Card, Button, TextField } from "@mui/material";
import { authApi } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();

    const login = async () => {
        const { user, pass } = { user: process.env.NEXT_PUBLIC_TEMP_USER, pass: process.env.NEXT_PUBLIC_TEMP_PASS };
        try {
            const { data }: { data: { error: boolean; token: string } } = await authApi().post("/login", {
                username: user,
                password: pass,
            });
            if (!data.error) {
                // router.push("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className="p-6 m-6 sm:w-[400px] drop-shadow-2xl">
            <h3 className="mb-5 mt-0">Welcome to Twitter.</h3>
            <TextField id="outlined-basic" size="small" label="Username" variant="outlined" className="w-full mb-4 " />
            <TextField
                id="outlined-basic"
                size="small"
                label="Password"
                type="password"
                variant="outlined"
                className="w-full mb-6"
            />
            <div className="w-full flex justify-center items-center">
                <Button variant="outlined" size="small" className="mx-4 min-w-[100px] border-black text-black">
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
    );
}
