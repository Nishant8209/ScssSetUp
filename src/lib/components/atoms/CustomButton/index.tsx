import React from 'react';
import Icon from '../Icon';
import styles from './CustomButton.module.scss'; // Import the SCSS module

interface ButtonProps {
  label: string; // Text label for the button
  iconName?: string; // Optional icon name
  iconPosition?: 'left' | 'right'; // Position of the icon (default is 'left')
  size?: 'small' | 'medium' | 'large'; // Button size
  onClick?: () => void; // Click handler
  className?: string; // Additional custom classes
  iconPath?: string; // Path to the sprite file
}

const CustomButton: React.FC<ButtonProps> = ({
  label,
  iconName,
  iconPosition = 'left',
  size = 'medium',
  onClick,
  className = '',
  iconPath = '/Icons/sprite.svg',
}) => {
  const sizeClasses = {
    small: `${styles.small} btn-sm`, // Using Bootstrap's btn-sm and custom SCSS
    medium: `${styles.medium} btn-md`, // btn-md from Bootstrap (can customize via SCSS)
    large: `${styles.large} btn-lg`, // btn-lg from Bootstrap
  };

  return (
    <div className='customComponent'>
      <button
        onClick={onClick}
        className={`  ${sizeClasses[size]} ${className} ${styles.customButton}`} // Combine Bootstrap and SCSS styles
      >
        {iconName && iconPosition === 'left' && (
          <Icon name={iconName} className={styles.icon} spritePath={iconPath} />
        )}
        {label}
        {iconName && iconPosition === 'right' && (
          <Icon name={iconName} className={styles.icon} spritePath={iconPath} />
        )}
      </button>
      
    </div>
  );
};

export default CustomButton;
