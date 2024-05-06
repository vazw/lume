import { cn } from "@lume/utils";
import { useNoteContext } from "./provider";
import { User } from "../user";

export function NoteActivity({ className }: { className?: string }) {
	const event = useNoteContext();
	const mentions = event.tags
		.filter((tag) => tag[0] === "p")
		.map((tag) => tag[1]);

	return (
		<div className={cn("-mt-3 mb-2", className)}>
			<div className="text-neutral-700 dark:text-neutral-300 inline-flex items-baseline gap-2 w-full overflow-hidden">
				<div className="shrink-0 text-sm font-medium">To:</div>
				{mentions.splice(0, 4).map((mention) => (
					<User.Provider key={mention} pubkey={mention}>
						<User.Root>
							<User.Name className="text-sm font-medium" />
						</User.Root>
					</User.Provider>
				))}
				{mentions.length > 4 ? "..." : ""}
			</div>
		</div>
	);
}