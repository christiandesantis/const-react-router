import { useEffect, useState } from "react";

const useDark = () => {
	// Use default value (true) for server-side rendering
	const [isDark, setIsDark] = useState(true);

	useEffect(() => {
		// Only run on client side
		if (typeof window !== "undefined") {
			// Set initial value based on system preference
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			setIsDark(mediaQuery.matches);

			// Set up event listener for system preference changes
			const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
			mediaQuery.addEventListener("change", handleChange);

			return () => mediaQuery.removeEventListener("change", handleChange);
		}
	}, []);

	return { isDark };
};

export default useDark;
