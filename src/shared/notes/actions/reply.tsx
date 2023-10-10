import * as Tooltip from '@radix-ui/react-tooltip';

import { ReplyIcon } from '@shared/icons';

import { useComposer } from '@stores/composer';

export function NoteReply({
  id,
  pubkey,
  root,
}: {
  id: string;
  pubkey: string;
  root?: string;
}) {
  const setReply = useComposer((state) => state.setReply);

  return (
    <Tooltip.Root delayDuration={150}>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          onClick={() => setReply(id, pubkey, root)}
          className="group inline-flex h-7 w-7 items-center justify-center text-neutral-500 dark:text-neutral-300"
        >
          <ReplyIcon className="h-5 w-5 group-hover:text-blue-500" />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="-left-10 inline-flex h-7 select-none items-center justify-center rounded-md bg-neutral-200 px-3.5 text-sm text-neutral-900 will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade dark:bg-neutral-800 dark:text-neutral-100">
          Quick reply
          <Tooltip.Arrow className="fill-neutral-200 dark:fill-neutral-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
