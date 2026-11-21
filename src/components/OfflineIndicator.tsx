import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-lg bg-[#181A1F] text-white px-4 py-2 text-xs font-medium border border-white/10"
    >
      <WifiOff className="w-4 h-4 text-[#F7F5F0]" />
      <span>Offline mode — viewing cached pages</span>
    </div>
  );
};
