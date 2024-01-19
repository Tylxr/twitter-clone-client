"use client";
import { Card, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Login() {
	const router = useRouter();
	return (
		<div className="w-screen h-screen">
			<div className="bg-black-gradient h-full w-full text-white flex flex-row justify-between items-center">
				<div className="w-full flex flex-col justify-center items-center">
					<div className="flex flex-col justify-center items-center">
						<h1 className="text-[70px] m-0" style={{ fontFamily: "Roboto-700" }}>
							Twitter
						</h1>
						<p className="text-lg m-0 italic" style={{ fontFamily: "Roboto-300" }}>
							Join the conversation.
						</p>
					</div>
					<Card className="p-6 m-6 w-[400px] drop-shadow-2xl">
						<h3 className="mb-6 mt-0">Welcome to Twitter.</h3>
						<TextField id="outlined-basic" size="small" label="Username" variant="outlined" className="w-full mb-4 " />
						<TextField id="outlined-basic" size="small" label="Password" type="password" variant="outlined" className="w-full mb-6" />
						<div className="w-full flex justify-center items-center">
							<Button variant="outlined" size="small" className="mx-4 min-w-[100px] border-black text-black">
								Register
							</Button>
							<Button onClick={() => router.push("/")} variant="outlined" size="small" className="mx-4 min-w-[100px] border-black text-black">
								Login
							</Button>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
