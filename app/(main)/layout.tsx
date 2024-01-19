import { Card } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen flex flex-col">
			{/* Header */}
			<div>
				<div className="w-full h-20 bg-gray-600 text-white">Header bar component</div>
			</div>

			{/* Main content section */}
			<div className="bg-black-gradient h-full w-full flex flex-row justify-center items-start">
				<div className="bg-lime-0 w-[1200px] h-full flex flex-row justify-between items-center">
					<div className="bg-purple-0 w-1/3 h-full">
						<div className="m-4">
							<Card className="my-4 p-4">TODO...</Card>
						</div>
					</div>
					<div className="bg-orange-0 w-2/3 h-full">
						<div className="m-4">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
