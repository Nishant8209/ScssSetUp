import React from 'react';

interface IconProps {
  name: string; // Name of the icon in the sprite, e.g., "icon-home"
  size?: number; // Optional size for the icon (default is 24px)
  color?: string; // Optional color for the icon (default is 'currentColor')
  className?: string; // Additional Tailwind classes for customization
  spritePath?: string; // Path to the sprite file (default is '/Icons/sprite.svg')
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  spritePath = '/Icons/sprite.svg', // Default sprite path
}) => {
  return (
    <svg
      className={`inline-block ${className}`}
      width={size}
      height={size}
      fill={color}
      aria-hidden="true"
    >
      <use href={`${spritePath}#${name}`} />
    </svg>
  );
};

export default Icon;
