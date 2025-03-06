import React, { useState, useRef, useEffect } from 'react';
import styles from './Popover.module.scss';

interface PopoverProps {
  open: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  placement?: 'top' | 'bottom';
  strategy?: 'fixed' | 'absolute';
}

const CustomPopover: React.FC<PopoverProps> = ({
  open,
  onClose,
  anchorRef,
  children,
  placement = 'bottom',
  strategy = 'fixed'
}) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<'top' | 'bottom'>(placement);
  
  // Update position on resize and scroll
  useEffect(() => {
    const updatePosition = () => {
      if (!anchorRef?.current || !popoverRef.current) return;
      
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const popoverHeight = popoverRef.current.offsetHeight;
      const spaceBelow = window.innerHeight - anchorRect.bottom;
      const spaceAbove = anchorRect.top;
      
      // Determine if popover should be above or below the anchor
      if (placement === 'bottom' && spaceBelow < popoverHeight && spaceAbove >= popoverHeight) {
        setPosition('top');
      } else if (placement === 'top' && spaceAbove < popoverHeight && spaceBelow >= popoverHeight) {
        setPosition('bottom');
      } else {
        setPosition(placement);
      }
      
      // Update the popover's position
      updatePopoverPosition(position);
    };
    
    const updatePopoverPosition = (pos: 'top' | 'bottom') => {
      if (!anchorRef?.current || !popoverRef.current) return;
      
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const popoverElem = popoverRef.current;
      
      if (pos === 'top') {
        popoverElem.style.bottom = `${window.innerHeight - anchorRect.top}px`;
        popoverElem.style.top = 'auto';
      } else {
        popoverElem.style.top = `${anchorRect.bottom}px`;
        popoverElem.style.bottom = 'auto';
      }
      
      // Horizontal positioning
      popoverElem.style.left = `${anchorRect.left}px`;
      
      // Adjust width to match anchor if needed
      if (anchorRect.width > 0) {
        popoverElem.style.width = `${Math.max(350, anchorRect.width)}px`;
      }
    };
    
    if (open) {
      // Initial position update
      setTimeout(updatePosition, 0);
      
      // Update on scroll and resize
      window.addEventListener('resize', updatePosition);
      
      if (strategy === 'fixed') {
        // For fixed strategy, we need to update position on scroll
        window.addEventListener('scroll', updatePosition, true);
      }
    }
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, anchorRef, placement, position, strategy]);
  
  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        anchorRef?.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose, anchorRef]);
  
  if (!open) return null;
  
  return (
    <div
      ref={popoverRef}
      className={`${styles.popover} ${styles[position]}`}
      style={{
        position: strategy,
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  );
};

export default CustomPopover;