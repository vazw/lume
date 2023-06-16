import { MultiAccounts } from "@shared/multiAccounts";
import { Navigation } from "@shared/navigation";

export function LayoutTrending({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex w-screen h-screen">
			<div className="relative flex flex-row shrink-0">
				<MultiAccounts />
				<Navigation />
			</div>
			<div className="w-full h-full">{children}</div>
		</div>
	);
}