import * as LucideIcons from "lucide-react";
import type { ComponentType } from "react";
import { NavLink } from "react-router";
import { BrandTitle } from "./ui/brand-title";

interface BrandTitleWrapperProps {
	title?: string;
	iconName?: string;
	size?: "responsive" | "xs" | "sm" | "md" | "lg" | "xl";
	to?: string;
	className?: string;
}

export const BrandTitleWrapper = ({
	title,
	iconName,
	size = "responsive",
	to,
	className,
}: BrandTitleWrapperProps) => {
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
			<BrandTitle icon={IconWrapper} size={size} className={className}>
				{title}
			</BrandTitle>
		</NavLink>
	);
};
