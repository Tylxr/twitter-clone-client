export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<h1>This is the layout for the login page</h1>
			{children}
		</div>
	);
}
