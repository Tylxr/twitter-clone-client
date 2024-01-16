import { Card, Button } from "@mui/material";

export default function Profile() {
	return (
		<div className="w-screen h-screen flex flex-row justify-between items-center">
			<div className="bg-dark-blue-gradient h-full w-full text-white">
				<div className="p-6 m-6">
					<Button variant="contained" color="primary" className="bg-red-500 hover:bg-red-400">
						My first button
					</Button>
				</div>
			</div>
		</div>
	);
}
