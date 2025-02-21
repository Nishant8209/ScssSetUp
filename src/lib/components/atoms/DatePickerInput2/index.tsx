import React, { useState, useRef } from "react";
import { FiCalendar } from "react-icons/fi"; // Importing calendar icon
import styles from "./DatePickerInput2.module.scss";
import CustomPopover from "../Popover";
import CalendarComponent2 from "../CalendarComponent2";

const DatePicker2: React.FC = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);
    const inputRef = useRef<HTMLDivElement | null>(null);

    const handleDateChange = (dates: [Date, Date] | null) => {
        setSelectedRange(dates);
        setShowCalendar(false); // Close popover when dates are selected
    };

    const formatDate = (dates: [Date, Date] | null): string => {
        if (!dates) return "";
        const [start, end] = dates;
        const format = (date: Date) =>
            `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
        return `${format(start)} - ${format(end)}`;
    };

    return (
        <div className={styles.datePicker}>
            {/* Wrapper for input and icon */}
            <div className={styles.inputWrapper} onClick={() => setShowCalendar(!showCalendar)}>
                <div ref={inputRef} className={`${styles.dateInput} ${showCalendar ? styles.active : ""}`}>
                    {selectedRange ? (
                        <div className={styles.selectedContainer}>
                            <span>{formatDate(selectedRange)}</span>
                            <span className={styles.tag}>Eilauftrag</span>
                        </div>
                    ) : (
                        <span className={styles.placeholder}>DD.MM.YYYY - DD.MM.YYYY</span>
                    )}
                </div>

                <FiCalendar className={styles.calendarIcon} onClick={() => setShowCalendar(!showCalendar)} />
            </div>

            {/* Popover with Calendar */}
            <CustomPopover open={showCalendar} onClose={() => setShowCalendar(false)} anchorRef={inputRef}>
                <CalendarComponent2
                    onChange={handleDateChange}
                    isActive={showCalendar}
                    value={selectedRange}
                />
            </CustomPopover>
        </div>
    );
};

export default DatePicker2;
