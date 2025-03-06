import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  options: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
  id?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Select...",
  onSelect,
  id = "dropdown",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
    // Return focus to button after selection
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (
      !isOpen &&
      (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      setIsOpen(true);
      setFocusedIndex(0);
      return;
    }

    if (isOpen) {
      switch (event.key) {
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          // Return focus to button
          if (buttonRef.current) {
            buttonRef.current.focus();
          }
          break;
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prevIndex) => {
            const newIndex = prevIndex < options.length - 1 ? prevIndex + 1 : 0;
            if (optionRefs.current[newIndex]) {
              optionRefs.current[newIndex]?.focus();
            }
            return newIndex;
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : options.length - 1;
            if (optionRefs.current[newIndex]) {
              optionRefs.current[newIndex]?.focus();
            }
            return newIndex;
          });
          break;
        case "Enter":
        case " ":
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            event.preventDefault();
            handleOptionClick(options[focusedIndex]);
          }
          break;
        case "Tab":
          setIsOpen(false);
          break;
        default:
          break;
      }
    }
  };

  // Option key handler
  const handleOptionKeyDown = (event: React.KeyboardEvent, option: string) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        handleOptionClick(option);
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        if (buttonRef.current) {
          buttonRef.current.focus();
        }
        break;
      case "ArrowDown":
      case "ArrowUp":
        // Let the parent handler manage this
        handleKeyDown(event);
        break;
      default:
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus first option when dropdown opens
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [isOpen, focusedIndex]);

  // Initialize optionRefs array when options change
  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, options.length);
  }, [options]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div
        ref={buttonRef}
        className={`${styles.control} ${isOpen ? styles.open : ""} ${
          selectedOption ? styles.filled : ""
        }`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-label={`${placeholder}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        aria-activedescendant={
          focusedIndex >= 0 ? `${id}-option-${focusedIndex}` : undefined
        }
        tabIndex={0}
      >
        {/* Floating Label */}
        <label
          htmlFor={id}
          className={`${styles.floatingLabel} ${
            isOpen || selectedOption ? styles.active : ""
          }`}
        >
          {placeholder}
        </label>

        <div className={styles.selectedValue}>{selectedOption}</div>

        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {isOpen && (
        <div
          className={styles.menu}
          role="listbox"
          id={`${id}-listbox`}
          aria-labelledby={`${id}-label`}
        >
          {options.map((option, index) => (
            <div
              ref={(el) => (optionRefs.current[index] = el)}
              key={option}
              id={`${id}-option-${index}`}
              className={`${styles.option} ${
                focusedIndex === index ? styles.focused : ""
              } ${selectedOption === option ? styles.selected : ""}`}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(e) => handleOptionKeyDown(e, option)}
              role="option"
              aria-selected={selectedOption === option}
              tabIndex={-1}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
