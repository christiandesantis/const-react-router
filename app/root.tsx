import { type ReactNode, useMemo } from "react";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import useDark from "./hooks/use-dark";
import "./styles/app.css";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export const Layout = ({ children }: { children: ReactNode }) => {
	const { isDark } = useDark();
	const className = useMemo(
		() => ["dark"].filter((el) => isDark || el !== "dark").join(" "),
		[isDark],
	);
	return (
		<html lang="en" className={className}>
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
};

const App = () => {
	return <Outlet />;
};

export default App;

export { ErrorBoundary } from "./components/error-boundary";
