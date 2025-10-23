import React, { ReactNode } from 'react';

interface SocialIconProps {
  href: string;
  title: string;
  children: ReactNode;
  iconColor?: string;
  hoverColor?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({
  href,
  title,
  children,
  iconColor = 'text-gray-700 dark:text-gray-200',
  hoverColor = 'hover:bg-purple-100 dark:hover:bg-purple-900'
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-110 ${iconColor} ${hoverColor}`}
      title={title}
    >
      {children}
    </a>
  );
};

export default SocialIcon;
