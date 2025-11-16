"use client";

import { useState } from "react";

const dayNameList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function DateSelector({ thisAgenda }) {
  const today = thisAgenda?.date
    ? thisAgenda.date
    : new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(today);
  const [dayName, setDayName] = useState(dayNameList[new Date(today).getDay()]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);

    if (newDate) {
      const dateObj = new Date(newDate + "T00:00:00"); // Prevent timezone issues
      setDayName(dayNameList[dateObj.getDay()]);
    }
  };

  return (
    <>
      <div className="col-12 col-md-5">
        <input
          type="date"
          className="form-control"
          name="date"
          value={selectedDate}
          onChange={handleDateChange}
          required
        />
      </div>
      <div className="col-12 col-md-5">
        <span className="input-group-text" id="dayName">
          {dayName}
        </span>
      </div>
    </>
  );
}
