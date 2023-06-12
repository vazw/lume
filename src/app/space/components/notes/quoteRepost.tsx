import { RootNote } from "@app/space/components/notes/rootNote";
import { NoteWrapper } from "@app/space/components/notes/wrapper";
import { NoteRepostUser } from "@app/space/components/user/repost";
import { getQuoteID } from "@utils/transform";

export function NoteQuoteRepost({
	block,
	event,
}: { block: number; event: any }) {
	const rootID = getQuoteID(event.tags);

	return (
		<NoteWrapper
			thread={rootID}
			block={block}
			className="h-min w-full px-3 py-1.5"
		>
			<div className="rounded-md bg-zinc-900">
				<div className="relative px-5 pb-5 pt-5">
					<div className="absolute left-[35px] top-[20px] h-[70px] w-0.5 bg-gradient-to-t from-zinc-800 to-zinc-600" />
					<NoteRepostUser pubkey={event.pubkey} time={event.created_at} />
				</div>
				<RootNote id={rootID} fallback={event.content} />
			</div>
		</NoteWrapper>
	);
}