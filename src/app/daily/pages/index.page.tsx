import NoteBase from '@lume/app/note/components/base';
import { Placeholder } from '@lume/app/note/components/placeholder';
import { NoteQuoteRepost } from '@lume/app/note/components/quoteRepost';
import { getNotes } from '@lume/utils/storage';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';

const ITEM_PER_PAGE = 10;
const TIME = Math.floor(Date.now() / 1000);

export function Page() {
  const { status, error, data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage }: any = useInfiniteQuery({
    queryKey: ['following'],
    queryFn: async ({ pageParam = 0 }) => {
      return await getNotes(TIME, ITEM_PER_PAGE, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const allRows = data ? data.pages.flatMap((d: { data: any }) => d.data) : [];
  const parentRef = useRef();

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400,
    overscan: 2,
  });

  const itemsVirtualizer = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNextPage, allRows.length, rowVirtualizer.getVirtualItems()]);

  return (
    <div className="relative h-full w-full rounded-lg border border-zinc-800 bg-zinc-900 shadow-input shadow-black/20">
      {status === 'loading' ? (
        <Placeholder />
      ) : status === 'error' ? (
        <div>{error.message}</div>
      ) : (
        <div ref={parentRef} className="scrollbar-hide h-full w-full overflow-y-auto" style={{ contain: 'strict' }}>
          <div
            className="relative w-full"
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            <div
              className="absolute left-0 top-0 w-full"
              style={{
                transform: `translateY(${itemsVirtualizer[0].start - rowVirtualizer.options.scrollMargin}px)`,
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const note = allRows[virtualRow.index];
                if (note) {
                  if (note.kind === 1) {
                    return (
                      <div key={virtualRow.index} data-index={virtualRow.index} ref={rowVirtualizer.measureElement}>
                        <NoteBase key={note.event_id} event={note} />
                      </div>
                    );
                  } else {
                    return (
                      <div key={virtualRow.index} data-index={virtualRow.index} ref={rowVirtualizer.measureElement}>
                        <NoteQuoteRepost key={note.event_id} event={note} />
                      </div>
                    );
                  }
                }
              })}
            </div>
          </div>
        </div>
      )}
      <div>{isFetching && !isFetchingNextPage ? <Placeholder /> : null}</div>
    </div>
  );
}