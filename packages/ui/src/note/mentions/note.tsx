import { NOSTR_MENTIONS } from "@lume/utils";
import { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import reactStringReplace from "react-string-replace";
import { User } from "../../user";
import { Hashtag } from "./hashtag";
import { MentionUser } from "./user";
import { useArk, useEvent } from "@lume/ark";

export function MentionNote({
  eventId,
  openable = true,
}: {
  eventId: string;
  openable?: boolean;
}) {
  const { t } = useTranslation();
  const { isLoading, isError, data } = useEvent(eventId);

  const ark = useArk();
  const richContent = useMemo(() => {
    if (!data) return "";

    let parsedContent: string | ReactNode[] = data.content;

    const text = parsedContent as string;
    const words = text.split(/( |\n)/);

    const hashtags = words.filter((word) => word.startsWith("#"));
    const mentions = words.filter((word) =>
      NOSTR_MENTIONS.some((el) => word.startsWith(el)),
    );

    try {
      if (hashtags.length) {
        for (const hashtag of hashtags) {
          parsedContent = reactStringReplace(
            parsedContent,
            hashtag,
            (match, i) => {
              return <Hashtag key={match + i} tag={hashtag} />;
            },
          );
        }
      }

      if (mentions.length) {
        for (const mention of mentions) {
          parsedContent = reactStringReplace(
            parsedContent,
            mention,
            (match, i) => <MentionUser key={match + i} pubkey={mention} />,
          );
        }
      }

      parsedContent = reactStringReplace(
        parsedContent,
        /(https?:\/\/\S+)/g,
        (match, i) => {
          const url = new URL(match);
          return (
            <a
              key={match + i}
              href={url.toString()}
              target="_blank"
              rel="noreferrer"
              className="content-break inline-block w-full truncate font-normal text-blue-500 hover:text-blue-600"
            >
              {url.toString()}
            </a>
          );
        },
      );

      return parsedContent;
    } catch (e) {
      console.log(e);
      return parsedContent;
    }
  }, [data]);

  if (isLoading) {
    return (
      <div
        contentEditable={false}
        className="my-1 flex w-full cursor-default items-center justify-between rounded-2xl border border-black/10 p-3 dark:border-white/10"
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div
        contentEditable={false}
        className="my-1 w-full cursor-default rounded-2xl border border-black/10 p-3 dark:border-white/10"
      >
        {t("note.error")}
      </div>
    );
  }

  return (
    <div className="my-1 flex w-full cursor-default flex-col rounded-2xl border border-black/10 px-3 pt-1 dark:border-white/10">
      <User.Provider pubkey={data.pubkey}>
        <User.Root className="flex h-10 items-center gap-2">
          <User.Avatar className="size-6 shrink-0 rounded-full object-cover" />
          <div className="inline-flex flex-1 items-center gap-2">
            <User.Name className="font-semibold text-neutral-900 dark:text-neutral-100" />
            <span className="text-neutral-600 dark:text-neutral-400">·</span>
            <User.Time
              time={data.created_at}
              className="text-neutral-600 dark:text-neutral-400"
            />
          </div>
        </User.Root>
      </User.Provider>
      <div className="line-clamp-4 select-text whitespace-normal text-balance leading-normal">
        {richContent}
      </div>
      {openable ? (
        <div className="flex h-10 items-center justify-between">
          <button
            type="button"
            onClick={() => ark.open_thread(data.id)}
            className="text-blue-500 hover:text-blue-600"
          >
            {t("note.showMore")}
          </button>
        </div>
      ) : (
        <div className="h-3" />
      )}
    </div>
  );
}
