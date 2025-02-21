import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import styles from "./CalendarComponent.module.scss";
import "react-calendar/dist/Calendar.css";

interface CalendarComponentProps {
  onChange: (date: Date) => void;
  isActive: boolean; // Accept active state from DatePicker
  value: Date | null; // Controlled value from parent
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onChange, isActive, value }) => {
  const [date, setDate] = useState<Date | null>(value || new Date());

  useEffect(() => {
    if (value !== null) {
      setDate(value); // Sync with parent state if value changes
    }
  }, [value]);

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    onChange(selectedDate); // Send selected date to parent (DatePicker)
    localStorage.setItem("selectedDate", selectedDate.toISOString()); // Store in localStorage
  };

  return (
    <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
      <Calendar
        value={date}
        onChange={(value) => handleDateChange(value as Date)}
        className={styles.calendar}
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString(locale, { weekday: "short" }).substring(0, 2)
        }
        formatDay={(_locale, date) => date.getDate().toString().padStart(2, "0")}
      />
    </div>
  );
};

export default CalendarComponent;
