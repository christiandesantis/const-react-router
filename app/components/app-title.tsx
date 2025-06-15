// Consider using a specific icon import instead of importing all icons
import * as LucideIcons from "lucide-react";
import type { ComponentType } from "react";
import { NavLink } from "react-router";
import { Title } from "./ui/title";

interface AppTitleProps {
	title?: string;
	iconName?: string;
	size?: "responsive" | "xs" | "sm" | "md" | "lg" | "xl";
	to?: string;
	className?: string;
}

export const AppTitle = ({
	title,
	iconName,
	size = "responsive",
	to,
	className,
}: AppTitleProps) => {
	const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as
		| ComponentType<{ className?: string }>
		| undefined;

	const IconWrapper = ({ className }: { className?: string }) => {
		if (IconComponent) {
			return <IconComponent className={className} />;
		}
		return <LucideIcons.AlertCircle className={className} />;
	};
	return (
		<NavLink to={to || "/"}>
			<Title icon={IconWrapper} size={size} className={className}>
				{title}
			</Title>
		</NavLink>
	);
};
