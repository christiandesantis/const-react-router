import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import type { RouteConfig } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

// Function to recursively scan directories for route files
const scanDirectory = (
	dirPath: string,
	relativePath = "",
): Array<{ path: string; file: string }> => {
	const routes: Array<{ path: string; file: string }> = [];

	try {
		const items = readdirSync(dirPath);

		for (const item of items) {
			const itemPath = join(dirPath, item);
			const stat = statSync(itemPath);

			if (stat.isFile() && (item.endsWith(".tsx") || item.endsWith(".ts"))) {
				const routeName = item.replace(/\.(tsx?|jsx?)$/, "");

				// Skip index files (handled by flatRoutes)
				if (routeName === "index" && !relativePath) {
					continue;
				}

				// For index files in subdirectories, use the directory name as the route
				if (routeName === "index") {
					routes.push({
						path: relativePath,
						file: join(relativePath, item).replace(/\\/g, "/"),
					});
				} else {
					// For non-index files, append the filename to the path
					const routePath = relativePath
						? `${relativePath}/${routeName}`
						: routeName;
					routes.push({
						path: routePath,
						file: join(relativePath, item).replace(/\\/g, "/"),
					});
				}
			} else if (stat.isDirectory()) {
				// Recursively scan subdirectories
				const subPath = relativePath ? `${relativePath}/${item}` : item;
				const subRoutes = scanDirectory(itemPath, subPath);
				routes.push(...subRoutes);
			}
		}
	} catch (error) {
		// Can't read directory, skip
	}

	return routes;
};

// Function to enhance the standard routes with nested directory routes
const enhanceRoutesWithNestedDirectories = async () => {
	const standardRoutes = await flatRoutes();

	// Collect nested directory routes by layout prefix
	const nestedRoutesByLayout = new Map();
	const routesDir = join(process.cwd(), "app/routes");

	try {
		const items = readdirSync(routesDir);

		for (const item of items) {
			const itemPath = join(routesDir, item);
			const stat = statSync(itemPath);

			if (stat.isDirectory() && item.startsWith("_")) {
				// Extract layout prefix (e.g., "_app" from "_app.example")
				const layoutPrefix = item.split(".")[0];

				// Scan the directory recursively
				const routes = scanDirectory(itemPath);

				for (const routeInfo of routes) {
					// Create the route pattern
					const routePattern = item
						.replace(/^_app\./, "") // Remove _app prefix
						.replace(/\./g, "/"); // Convert dots to slashes
					const fullRoutePattern = `${routePattern}/${routeInfo.path}`;

					const routeConfig = route(
						fullRoutePattern,
						`./routes/${item}/${routeInfo.file}`,
					);

					// Group by layout prefix
					if (!nestedRoutesByLayout.has(layoutPrefix)) {
						nestedRoutesByLayout.set(layoutPrefix, []);
					}
					nestedRoutesByLayout.get(layoutPrefix).push(routeConfig);
				}
			}
		}
	} catch (error) {
		console.warn("Could not scan routes directory:", error);
	}

	// Function to recursively find and enhance layout routes
	// biome-ignore lint/suspicious/noExplicitAny: Route config types are complex
	const enhanceRoutes = (routes: any[]): any[] => {
		return routes.map((routeConfig) => {
			// Check if this route has children (process them recursively)
			if (routeConfig.children) {
				routeConfig.children = enhanceRoutes(routeConfig.children);
			}

			// Check if this is a layout route that should get additional nested routes
			if (routeConfig.file) {
				const layoutMatch = routeConfig.file.match(/^routes\/(_[^.]+)\.tsx?$/);
				if (layoutMatch) {
					const layoutPrefix = layoutMatch[1];
					const additionalRoutes = nestedRoutesByLayout.get(layoutPrefix) || [];

					if (additionalRoutes.length > 0) {
						// Add our nested routes as children of this layout
						routeConfig.children = [
							...(routeConfig.children || []),
							...additionalRoutes,
						];

						// Remove from map so we don't create duplicates
						nestedRoutesByLayout.delete(layoutPrefix);
					}
				}
			}

			return routeConfig;
		});
	};

	// Enhance existing routes instead of creating new ones
	const enhancedRoutes = enhanceRoutes(standardRoutes);
	return enhancedRoutes;
};

export default (await enhanceRoutesWithNestedDirectories()) satisfies RouteConfig;
