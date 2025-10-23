import React from 'react';
import Image from 'next/image';

const TwitchButton = () => {
  return (
    <a
      href="https://www.twitch.tv/lafededuchill"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center transition-all duration-300"
    >
      <Image
        src="/twitch-icon.svg"
        alt="Twitch"
        width={24}
        height={24}
        className="w-6 h-6 opacity-60 hover:opacity-100 transition-all duration-500 brightness-0 invert hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
      />
    </a>
  );
};

export default TwitchButton;
