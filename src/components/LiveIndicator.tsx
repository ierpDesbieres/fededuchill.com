'use client';

import React, { useEffect, useState } from 'react';

interface LiveStatus {
  isLive: boolean;
  viewerCount?: number;
  title?: string;
  thumbnail?: string;
  cached?: boolean;
}

const LiveIndicator = () => {
  const [liveStatus, setLiveStatus] = useState<LiveStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const response = await fetch('/api/twitch/live');
        const data = await response.json();
        setLiveStatus(data);
      } catch (error) {
        console.error('Error fetching live status:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial check
    checkLiveStatus();

    // Check every 30 seconds (aligned with server cache)
    const interval = setInterval(checkLiveStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  // Don't render while loading
  if (loading) {
    return null;
  }

  const isLive = liveStatus?.isLive || false;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://www.twitch.tv/lafededuchill"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-lg transition-all duration-500 ${
          isLive ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'
        }`}
      >
        <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></span>
        <span className="text-white text-sm font-medium transition-opacity duration-300">
          {isLive ? 'ON AIR' : 'Offline'}
        </span>
        <div className={`flex items-center gap-2 overflow-hidden transition-all duration-500 ${
          isLive && liveStatus?.viewerCount !== undefined ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
        }`}>
          <div className="h-4 w-px bg-white/30 mx-1"></div>
          <span className="text-white text-sm font-medium flex items-center gap-1.5 whitespace-nowrap">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
            {liveStatus?.viewerCount?.toLocaleString() || '0'}
          </span>
        </div>
      </a>
    </div>
  );
};

export default LiveIndicator;
