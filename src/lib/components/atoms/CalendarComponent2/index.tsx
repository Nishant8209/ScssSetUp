import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import styles from "./CalendarComponent2.module.scss";
import "react-calendar/dist/Calendar.css";

interface CalendarComponentProps {
  onChange: (dates: [Date, Date] | null) => void;
  isActive: boolean;
  value: [Date, Date] | null;
}

const CalendarComponent2: React.FC<CalendarComponentProps> = ({ onChange, isActive, value }) => {
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(value);

  useEffect(() => {
    if (value) setDateRange(value);
  }, [value]);

  const handleDateChange = (selectedRange: [Date, Date]) => {
    if (selectedRange && selectedRange.length === 2) {
      const [start, end] = selectedRange;
      setDateRange([start, end]);
      onChange([start, end]);
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month' || !dateRange) return '';

    const [start, end] = dateRange;
    
    if (date.toDateString() === start.toDateString()) {
      return styles.startDate;
    }
    if (date.toDateString() === end.toDateString()) {
      return styles.endDate;
    }
    
    if (date > start && date < end) {
      return styles.inRange;
    }
    
    return '';
  };

  return (
    <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
      <Calendar
        selectRange 
        value={dateRange} 
        onChange={(value) => handleDateChange(value as [Date, Date])}
        className={styles.calendar}
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString(locale, { weekday: "short" }).substring(0, 2)
        }
        formatDay={(_locale, date) => date.getDate().toString().padStart(2, "0")}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CalendarComponent2;