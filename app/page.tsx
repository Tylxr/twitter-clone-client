"use client"; //! TEMPORARY

import Login from "./components/Login";
import Feed from "./components/Feed";
import { useState } from "react";

export default function Home() {
	const [loggedIn, setLoggedIn] = useState(false);
	return (
		<div>
			<p onClick={() => setLoggedIn(true)}>login</p>
			{!loggedIn && <Login />}
			{loggedIn && <Feed />}
		</div>
	);
}
