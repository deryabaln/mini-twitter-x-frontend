import React, { useState } from 'react';

const DateSelector = ({ onSelectDate }) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const daysInMonth = {
    "01": 31,
    "02": 28,
    "03": 31,
    "04": 30,
    "05": 31,
    "06": 30,
    "07": 31,
    "08": 31,
    "09": 30,
    "10": 31,
    "11": 30,
    "12": 31,
  };

  const days = Array.from({ length: daysInMonth[selectedMonth] || 31 }, (_, i) => i + 1);
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    onSelectDate(selectedYear, selectedMonth, e.target.value);
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setSelectedMonth(selectedMonth);
    if (selectedDay > daysInMonth[selectedMonth]) {
      setSelectedDay('');
    }
    onSelectDate(selectedYear, selectedMonth, selectedDay);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    onSelectDate(e.target.value, selectedMonth, selectedDay);
  };

  return (
    <div>
      <h5>Date of birth:</h5>
      <p style={{ fontFamily: "serif", fontSize: "0.85rem", color: "gray" }} >Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh sit. Quis bibendum ante phasellus metus, magna lacinia sed augue. Odio enim nascetur leo mauris vel eget. Pretium id ullamcorper blandit viverra dignissim eget tellus. Nibh mi massa in molestie a sit. Elit congue.</p>
      <select style={{ width: "32%", marginRight: "1%", height: "35px", borderRadius: "5px ", border: "1.3px solid #E4EAED", backgroundColor: "#ffffff", color: "GrayText" }} onChange={handleMonthChange} value={selectedMonth}>
        <option value="">Month</option>
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select style={{ width: "32%", marginRight: "1%", height: "35px", borderRadius: "5px ", border: "1.3px solid #E4EAED", backgroundColor: "#ffffff", color: "GrayText" }} onChange={handleDayChange} value={selectedDay}>
        <option value="">Day</option>
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select style={{ width: "32%", height: "35px", borderRadius: "5px ", border: "1.3px solid #E4EAED", backgroundColor: "#ffffff", color: "GrayText" }} onChange={handleYearChange} value={selectedYear}>
        <option value="">Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
