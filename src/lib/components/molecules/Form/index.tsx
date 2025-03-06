import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./Form.module.scss";
import CustomPopover from "../../atoms/Popover";
import { CalendarComponent, DropDown, Input } from "../../atoms";
import CalendarComponent2 from "../../atoms/CalendarComponent2";

interface IFormInput {
  city: string;
  State: string;
  Pincode: string;
  country: string;
  note: string;
  dateOfBirth: Date;
  dateRange: [Date, Date] | null;
  category: string;
  street: string;
  Building: string;
  floor: string;
}

const options = ["Category 1", "Category 2", "Category 3"];

export const Form: React.FC = () => {
  const methods = useForm<IFormInput>();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = methods;

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setForm] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const dateRangePickerRef = useRef<HTMLDivElement>(null);
  const [showCalendar2, setShowCalendar2] = useState(false);
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("data", data);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setValue("dateOfBirth", date, { shouldValidate: true });
    clearErrors("dateOfBirth");
    setShowCalendar(false);
  };

  const handleDateRangeChange = (dates: [Date, Date] | null) => {
    setSelectedRange(dates);
    setValue("dateRange", dates, { shouldValidate: true });
    setShowCalendar2(false);
  };

  const handleSelect = (value: string) => {
    setValue("category", value);
    clearErrors("category");
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formatDateRange = (range: [Date, Date] | null): string => {
    if (!range || !range[0] || !range[1]) return "";
    return `${formatDate(range[0])} - ${formatDate(range[1])}`;
  };

  const clearInputField = (fieldName: keyof IFormInput) => {
    setValue(fieldName, "" as any, { shouldValidate: true });
    if (fieldName === "dateOfBirth") {
      setSelectedDate(null);
    }
    if (fieldName === "dateRange") {
      setSelectedRange(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formContainer}
      aria-labelledby="form-title"
      role="form"
    >
      <div
        role="region"
        aria-label="Category Selection"
        className={styles.dropdownContainer}
      >
        <label htmlFor="category" className="visually-hidden">
          Select Category
        </label>
        <DropDown
          id="category"
          options={options}
          onSelect={handleSelect}
          aria-required="true"
          placeholder="Select Category"
        />
        {errors.category && (
          <span id="error-category" className="visually-hidden" role="alert">
            {errors.category?.message}
          </span>
        )}
      </div>

      <div
        role="region"
        aria-label="Address Information"
        className={styles.Personal}
      >
        <p>Address </p>
        <p>Address 1</p>
      </div>

      <div
        role="group"
        aria-label="Location Details"
        className={styles.nameFieldsContainer}
      >
        <div>
          <label htmlFor="city" className="visually-hidden">
            City
          </label>
          <Input
            id="city"
            type="text"
            placeholder="City"
            hasError={!!errors.city}
            {...register("city", { required: "City name is required" })}
            className="rounded-start"
            onClear={() => clearInputField("city")}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "error-city" : undefined}
          />
          {errors.city && (
            <span id="error-city" className="visually-hidden" role="alert">
              {errors.city?.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="State" className="visually-hidden">
            State
          </label>
          <Input
            id="State"
            type="text"
            placeholder="State"
            hasError={!!errors.State}
            {...register("State", { required: "State name is required" })}
            className="rounded-end"
            onClear={() => clearInputField("State")}
            aria-invalid={!!errors.State}
            aria-describedby={errors.State ? "error-State" : undefined}
          />
          {errors.State && (
            <span id="error-State" className="visually-hidden" role="alert">
              {errors.State?.message}
            </span>
          )}
        </div>
      </div>

      <div
        role="group"
        aria-label="Country and Pincode"
        className={styles.address}
      >
        <div>
          <label htmlFor="country" className="visually-hidden">
            Country
          </label>
          <Input
            id="country"
            type="text"
            placeholder="Country"
            hasError={!!errors.country}
            {...register("country", {
              required: "Country is required",
            })}
            className="rounded-start"
            onClear={() => clearInputField("country")}
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? "error-country" : undefined}
          />
          {errors.country && (
            <span id="error-country" className="visually-hidden" role="alert">
              {errors.country?.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="Pincode" className="visually-hidden">
            Pincode
          </label>
          <Input
            id="Pincode"
            type="text"
            inputMode="text"
            placeholder="Pincode"
            hasError={!!errors.Pincode}
            {...register("Pincode", {
              required: "Pincode is required",
            })}
            className="rounded-end"
            onClear={() => clearInputField("Pincode")}
            aria-invalid={!!errors.Pincode}
            aria-describedby={errors.Pincode ? "error-Pincode" : undefined}
          />
          {errors.Pincode && (
            <span id="error-Pincode" className="visually-hidden" role="alert">
              {errors.Pincode?.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="note" className="visually-hidden">
          Note
        </label>
        <Input
          id="note"
          type="text"
          placeholder="Add Note"
          hasError={!!errors.note}
          {...register("note")}
          className="rounded"
          onClear={() => clearInputField("note")}
          aria-invalid={!!errors.note}
          aria-describedby={errors.note ? "error-note" : undefined}
        />
        {errors.note && (
          <span id="error-note" className="visually-hidden" role="alert">
            {errors.note?.message}
          </span>
        )}
      </div>

      <div role="region" aria-label="Additional Address Details">
        <button
          type="button"
          onClick={() => setForm((prev) => !prev)}
          className={styles.addresssubheading}
          aria-expanded={showForm}
          aria-controls="expandable-address"
        >
          {showForm ? "- Click here" : "+ Click here"}
        </button>
        {showForm && (
          <div
            className={`${styles.expandableContainer} ${
              showForm ? styles.open : styles.closed
            }`}
            id="expandable-address"
            role="region"
            aria-label="Detailed Address Information"
          >
            <div className="my-4">
              My current address is in the area of Jubilee Hills, Hyderabad.
              This is conveniently located near making it easily accessible for
              deliveries or visitors.
            </div>

            <div className={styles.inputRow}>
              <label htmlFor="street" className="visually-hidden">
                Street
              </label>
              <Input
                id="street"
                type="text"
                placeholder="Street"
                hasError={!!errors.street}
                {...register("street")}
                className="rounded"
                onClear={() => clearInputField("street")}
                aria-invalid={!!errors.street}
                aria-describedby={errors.street ? "error-street" : undefined}
              />
              {errors.street && (
                <span
                  id="error-street"
                  className="visually-hidden"
                  role="alert"
                >
                  {errors.street?.message}
                </span>
              )}
            </div>

            <div className={styles.addressForm}>
              <div>
                <label htmlFor="Building" className="visually-hidden">
                  Building
                </label>
                <Input
                  id="Building"
                  type="text"
                  placeholder="Building"
                  hasError={!!errors.Building}
                  {...register("Building")}
                  className="rounded-start"
                  onClear={() => clearInputField("Building")}
                  aria-invalid={!!errors.Building}
                  aria-describedby={
                    errors.Building ? "error-Building" : undefined
                  }
                />
                {errors.Building && (
                  <span
                    id="error-Building"
                    className="visually-hidden"
                    role="alert"
                  >
                    {errors.Building?.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="floor" className="visually-hidden">
                  Floor
                </label>
                <Input
                  id="floor"
                  type="text"
                  placeholder="Add Floor"
                  hasError={!!errors.floor}
                  {...register("floor")}
                  className="rounded-end"
                  onClear={() => clearInputField("floor")}
                  aria-invalid={!!errors.floor}
                  aria-describedby={errors.floor ? "error-floor" : undefined}
                />
                {errors.floor && (
                  <span
                    id="error-floor"
                    className="visually-hidden"
                    role="alert"
                  >
                    {errors.floor?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.datePicker}>
        <h6>Date Picker</h6>
        <p>Date of Birth</p>
      </div>
      <div className={styles.datePickerContainer} ref={datePickerRef}>
        <label htmlFor="dateOfBirth" className="visually-hidden">
          Date of Birth
        </label>
        <Input
          id="dateOfBirth"
          type="text"
          placeholder="Date of Birth"
          readOnly
          value={formatDate(selectedDate)}
          onClick={() => setShowCalendar(!showCalendar)}
          hasError={!!errors.dateOfBirth}
          {...register("dateOfBirth", {
            required: "Date of birth is required",
          })}
          className="rounded"
          onClear={() => clearInputField("dateOfBirth")}
          aria-invalid={!!errors.dateOfBirth}
          aria-describedby={
            errors.dateOfBirth ? "error-dateOfBirth" : undefined
          }
        />
        {errors.dateOfBirth && (
          <span id="error-dateOfBirth" className="visually-hidden" role="alert">
            {errors.dateOfBirth?.message}
          </span>
        )}
        <CustomPopover
          open={showCalendar}
          onClose={() => setShowCalendar(false)}
          anchorRef={datePickerRef}
          placement="bottom"
          strategy="fixed"
        >
          <CalendarComponent
            onChange={handleDateChange}
            isActive={showCalendar}
            value={selectedDate}
          />
        </CustomPopover>
      </div>

      <div className={styles.datePicker}>
        <p>Date Range</p>
      </div>
      <div className={styles.datePickerContainer} ref={dateRangePickerRef}>
        <label htmlFor="dateRange"  className="visually-hidden">
          Select Date Range
        </label>
        <Input
          id="dateRange"
          type="text"
          placeholder="Date range"
          readOnly
          value={formatDateRange(selectedRange)}
          onClick={() => setShowCalendar2(!showCalendar2)}
          hasError={!!errors.dateRange}
          className="rounded"
          {...register("dateRange", {
            required: "Date of dateRange is required",
          })}
          onClear={() => clearInputField("dateRange")}
          aria-invalid={!!errors.dateRange}
          aria-describedby={
            errors.dateRange ? "error-dateRange" : undefined
          }
        />
         {errors.dateRange && (
          <span id="error-dateRange" className="visually-hidden" role="alert">
            {errors.dateOfBirth?.message}
          </span>
        )}
        <CustomPopover
          open={showCalendar2}
          onClose={() => setShowCalendar2(false)}
          anchorRef={dateRangePickerRef}
          placement="bottom"
          strategy="fixed"
        >
          <CalendarComponent2
            onChange={handleDateRangeChange}
            isActive={showCalendar2}
            value={selectedRange}         
          />
        </CustomPopover>
      </div>


      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};
