import { Link } from 'react-router-dom';

import { ActiveAccount } from '@shared/accounts/active';
import { SettingsIcon } from '@shared/icons';
import { Logout } from '@shared/logout';
import { NotificationModal } from '@shared/notification/modal';

import { useAccount } from '@utils/hooks/useAccount';

export function LumeBar() {
  const { status, account } = useAccount();

  return (
    <div className="rounded-xl border-t border-zinc-800/50 bg-zinc-900/80 p-2 backdrop-blur-md">
      <div className="flex items-center justify-between">
        {status === 'loading' ? (
          <>
            <div className="group relative flex h-9 w-9 shrink animate-pulse items-center justify-center rounded-md bg-zinc-900" />
            <div className="group relative flex h-9 w-9 shrink animate-pulse items-center justify-center rounded-md bg-zinc-900" />
          </>
        ) : (
          <>
            <ActiveAccount data={account} />
            <NotificationModal pubkey={account.pubkey} />
          </>
        )}
        <Link
          to="/settings/general"
          className="inline-flex h-9 w-9 transform items-center justify-center rounded-md border-t border-zinc-700/50 bg-zinc-800 active:translate-y-1"
        >
          <SettingsIcon className="h-4 w-4 text-zinc-400" />
        </Link>
        <Logout />
      </div>
    </div>
  );
}