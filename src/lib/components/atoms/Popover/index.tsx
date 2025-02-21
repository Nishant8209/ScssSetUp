import React, { useState, useRef, useEffect } from 'react';
import styles from './Popover.module.scss';

interface PopoverProps {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

const CustomPopover: React.FC<PopoverProps> = ({ open, onClose, anchorRef, children }) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<'left' | 'right' | 'bottom'>('left');
  const [popoverClass, setPopoverClass] = useState('');

  useEffect(() => {
    const updatePosition = () => {
      if (anchorRef.current) {
        const buttonRect = anchorRef.current.getBoundingClientRect();

        if (window.innerWidth < 768) {
          setPosition('bottom');
        } else if (buttonRect.right > window.innerWidth / 2) {
          setPosition('left');
        } else {
          setPosition('right');
        }
      }
    };

    if (open) {
      updatePosition();
      setPopoverClass(styles[position]);
    }

    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, anchorRef, position]);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close popover when clicking outside
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose, anchorRef]);

  return open ? (
    <div ref={popoverRef} className={`${styles.popover} ${popoverClass}`}>
      {children}

    </div>  
  ) : null;
};
export default CustomPopover;