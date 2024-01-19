import { Card } from "@mui/material";

export default function Tweet() {
	return (
		<Card className="p-4">
			<div className="flex flex-col justify-between items-center">
				<div className="w-full h-full flex flex-row justify-between items-start">
					<div className="mr-4 bg-lime-300 h-[40px] w-[40px] min-h-[40px] min-w-[40px] rounded-full"></div>
					<div className="w-full">
						<div className="w-full flex justify-between">
							<span className="mr-4">Tyler Marshall</span>
							<span className="text-xs text-gray-400">8 minutes ago</span>
						</div>
						<div>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id maiores soluta voluptatibus corporis ipsam laborum officia, nihil, quos
							laudantium tempore impedit sed incidunt cupiditate tempora modi rerum sequi, dignissimos voluptate.
						</div>
					</div>
				</div>
				<div className="mt-2 w-full h-full flex flex-row justify-end items-center">
					<div className="ml-4">98 likes</div>
					<div className="ml-4">8 comments</div>
				</div>
			</div>
		</Card>
	);
}
