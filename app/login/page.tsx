import { Card, Button, TextField } from "@mui/material";
import Layout from "./layout";

export default function Login() {
	return (
		<div className="w-screen h-screen">
			<div className="bg-black-gradient h-full w-full text-white flex flex-row justify-between items-center">
				<div className="w-1/2 flex justify-center items-center">
					<Card className="p-6 m-6 w-[400px]">
						<h3 className="mb-6 mt-0">Welcome to Twitter.</h3>
						<TextField id="outlined-basic" size="small" label="Username" variant="outlined" className="w-full mb-4 border-red-400" />
						<TextField
							id="outlined-basic"
							size="small"
							label="Password"
							type="password"
							variant="outlined"
							className="w-full mb-6 border-red-400"
						/>
						<div className="w-full flex justify-center items-center">
							<Button variant="outlined" size="small" className="mx-4 min-w-[100px] border-black text-black">
								Register
							</Button>
							<Button variant="outlined" size="small" className="mx-4 min-w-[100px] border-black text-black">
								Login
							</Button>
						</div>
					</Card>
				</div>
				<div className="w-1/2 flex flex-col justify-center items-center">
					<h1 className="text-[70px] m-0" style={{ fontFamily: "Roboto-700" }}>
						Twitter
					</h1>
					<p className="text-lg m-0 italic" style={{ fontFamily: "Roboto-300" }}>
						Join the conversation.
					</p>
				</div>
			</div>
		</div>
	);
}
