import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
		// Custom plugin to handle DevTools requests silently
		{
			name: "devtools-filter",
			configureServer(server) {
				server.middlewares.use("/.well-known", (_req, res) => {
					res.statusCode = 404;
					res.end();
				});
			},
		},
	],
});
