import Tweet from "../components/Tweet";

export default function Page({ children }: { children: React.ReactNode }) {
	return (
		<div className="">
			<div className="mb-4">
				<Tweet />
			</div>
			<div className="mb-4">
				<Tweet />
			</div>
			<div className="mb-4">
				<Tweet />
			</div>
		</div>
	);
}
