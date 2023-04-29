import { ImagePicker } from '@lume/shared/form/imagePicker';
import { RelayContext } from '@lume/shared/relayProvider';
import { WRITEONLY_RELAYS } from '@lume/stores/constants';
import { noteContentAtom } from '@lume/stores/note';
import { dateToUnix } from '@lume/utils/getDate';
import { useActiveAccount } from '@lume/utils/hooks/useActiveAccount';

import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { getEventHash, signEvent } from 'nostr-tools';
import { useContext } from 'react';

export default function NoteForm() {
  const pool: any = useContext(RelayContext);
  const { account, isLoading, isError } = useActiveAccount();
  const [value, setValue] = useAtom(noteContentAtom);
  const resetValue = useResetAtom(noteContentAtom);

  const submitEvent = () => {
    if (!isLoading && !isError && account) {
      const event: any = {
        content: value,
        created_at: dateToUnix(),
        kind: 1,
        pubkey: account.pubkey,
        tags: [],
      };
      event.id = getEventHash(event);
      event.sig = signEvent(event, account.privkey);

      // publish note
      pool.publish(event, WRITEONLY_RELAYS);
      // reset form
      resetValue();
      // send notification
      // sendNotification('Note has been published successfully');
    } else {
      console.log('Cannot publish note');
    }
  };

  return (
    <div className="p-3">
      <div className="relative h-32 w-full shrink-0 overflow-hidden before:pointer-events-none before:absolute before:-inset-1 before:rounded-[11px] before:border before:border-fuchsia-500 before:opacity-0 before:ring-2 before:ring-fuchsia-500/20 before:transition after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/5 after:transition focus-within:before:opacity-100 focus-within:after:shadow-fuchsia-500/100 dark:focus-within:after:shadow-fuchsia-500/20">
        <div>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            placeholder="What's up?"
            className="relative h-32 w-full resize-none rounded-lg border border-black/5 px-3.5 py-3 text-sm shadow-input shadow-black/5 !outline-none placeholder:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-200 dark:shadow-black/10 dark:placeholder:text-zinc-500"
          />
        </div>
        <div className="absolute bottom-2 w-full px-2">
          <div className="flex w-full items-center justify-between bg-zinc-800">
            <div className="flex items-center gap-2 divide-x divide-zinc-700">
              <ImagePicker type="note" />
              <div className="flex items-center gap-2 pl-2"></div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => submitEvent()}
                disabled={value.length === 0 ? true : false}
                className="inline-flex h-8 w-16 items-center justify-center rounded-md bg-fuchsia-500 px-4 text-sm font-medium shadow-button hover:bg-fuchsia-600 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
