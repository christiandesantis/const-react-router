import type { ComponentType, ReactNode } from "react";
import { cn } from "~/lib/utils";

interface TitleProps {
	children: ReactNode;
	className?: string;
	icon?: ComponentType<{ className?: string }>;
	size?: "responsive" | "xs" | "sm" | "md" | "lg" | "xl";
}

export const Title = ({
	children,
	className,
	icon: Icon,
	size = "responsive",
}: TitleProps) => {
	const shadow =
		"text-shadow:_0_1px_0_rgb(0_0_0_/_40%),_0_2px_0_rgb(0_0_0_/_30%),_0_3px_0_rgb(0_0_0_/_20%)";

	const iconSizeClasses = {
		responsive: "w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 flex-shrink-0",
		xs: "w-6 h-6 flex-shrink-0",
		sm: "w-8 h-8 flex-shrink-0",
		md: "w-12 h-12 flex-shrink-0",
		lg: "w-16 h-16 flex-shrink-0",
		xl: "w-20 h-20 flex-shrink-0",
	};

	const textSizeClasses = {
		responsive:
			"text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl relative",
		xs: "text-xl font-medium tracking-tight relative",
		sm: "text-2xl font-medium tracking-tight relative",
		md: "text-4xl font-medium tracking-tight relative",
		lg: "text-5xl font-medium tracking-tight relative",
		xl: "text-7xl font-medium tracking-tight relative",
	};

	return (
		<div className="flex items-center gap-1">
			{Icon && <Icon className={cn(iconSizeClasses[size])} />}
			<h1 className={cn(textSizeClasses[size], `[${shadow}]`, className)}>
				{children}
			</h1>
		</div>
	);
};
