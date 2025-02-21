import React, { useState, useRef } from "react";
import { FiCalendar } from "react-icons/fi"; // Importing calendar icon
import styles from "./DatePicker.module.scss";
import CalendarComponent from "../CalendarComponent";
import CustomPopover from "../Popover";

const DatePicker: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Close the popover when date is selected
  };
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  return (
    <div className={styles.datePicker}>
      {/* Wrapper for input and icon */}
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          readOnly
          className={`${styles.dateInput} ${showCalendar ? styles.active : ""}`} // Apply 'active' class when popover is open
          placeholder="DD-MM-YYYY"
          value={formatDate(selectedDate)}
          onFocus={() => setShowCalendar(true)}
        />
        <FiCalendar className={styles.calendarIcon} onClick={() => setShowCalendar(!showCalendar)} />
      </div>

      {/* Popover with Calendar */}
      <CustomPopover open={showCalendar} onClose={() => setShowCalendar(false)} anchorRef={inputRef}>
        <CalendarComponent onChange={handleDateChange} isActive={showCalendar}  value={selectedDate}  />
      </CustomPopover>
    </div>
  );
};

export default DatePicker;
