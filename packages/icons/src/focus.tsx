import type { SVGProps } from "react";

export function FocusIcon(
	props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="currentColor"
				d="M9 13a3 3 0 013 3v3a3 3 0 01-3 3H5a3 3 0 01-3-3v-3a3 3 0 013-3h4z"
			></path>
			<path
				fill="currentColor"
				d="M20 6a1 1 0 00-1-1H6a1 1 0 00-1 1v4a1 1 0 11-2 0V6a3 3 0 013-3h13a3 3 0 013 3v7a3 3 0 01-3 3h-4a1 1 0 110-2h4a1 1 0 001-1V6z"
			></path>
			<path
				fill="currentColor"
				d="M17 7a1 1 0 011 1v3a1 1 0 11-2 0v-.586l-1.293 1.293a1 1 0 01-1.414-1.414L14.586 9H14a1 1 0 110-2h3z"
			></path>
		</svg>
	);
}
