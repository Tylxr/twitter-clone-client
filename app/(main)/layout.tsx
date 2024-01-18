export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<h1 className="bg-green-200">This is main's layout!!</h1>
			{children}
		</div>
	);
}
