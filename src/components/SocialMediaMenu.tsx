import React from 'react';
import { FaGithub, FaLinkedin, FaYoutube, FaTwitch } from 'react-icons/fa';
import { Icon } from '@mdi/react';
import { mdiPost } from '@mdi/js';
import SocialIcon from './SocialIcon';

const SocialMediaMenu = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 ml-1">Connect with me</p>
        <div className="flex space-x-3">      
          <SocialIcon 
            href="https://bsky.app/profile/fededuchill" 
            title="Bluesky"
            iconColor="text-blue-500"
            hoverColor="hover:bg-blue-100 dark:hover:bg-blue-900/30"
          >
            <Icon path={mdiPost} size={1} />
          </SocialIcon>
          
          
          <SocialIcon 
            href="https://youtube.com/fededuchill" 
            title="YouTube"
            iconColor="text-red-600"
            hoverColor="hover:bg-red-100 dark:hover:bg-red-900/30"
          >
            <FaYoutube className="w-5 h-5" />
          </SocialIcon>
          
          <SocialIcon 
            href="https://twitch.tv/fededuchill" 
            title="Twitch"
            iconColor="text-purple-600"
            hoverColor="hover:bg-purple-100 dark:hover:bg-purple-900/30"
          >
            <FaTwitch className="w-5 h-5" />
          </SocialIcon>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaMenu;
