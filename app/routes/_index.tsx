import { AppTitle } from "~/components/app-title";
import { env } from "~/lib/env";
import type { Route } from "./+types/_index";

export const meta = ({ data: _data }: Route.MetaArgs) => {
	return [
		{ title: env.APP_NAME || "Const RR" },
		{ name: "description", content: `Welcome to ${env.APP_NAME || "Const RR"}!` },
	];
};

const Index = () => {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-12 p-6 md:p-10">
			<AppTitle
				title={env.APP_NAME || "Const RR"}
				iconName={env.APP_ICON || "HeartPulse"}
				size="xl"
			/>
		</div>
	);
};

export default Index;
