import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "fs-routes-next";

export default (await flatRoutes()) satisfies RouteConfig;
