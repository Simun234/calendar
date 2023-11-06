// Calendar.tsx
import React, { useEffect } from "react";
import "../App.css";

function Calendar({ tableId, month, setMonth }) {
  const year = 2023; // Fixed year

  useEffect(() => {
    // Ensure you've got a valid table element to work with
    const tableBody = document.querySelector(`#${tableId} tbody`);
    if (!tableBody) {
      console.error(`Table body for table '${tableId}' not found.`);
      return;
    }

    // Clear previous calendar rows
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }

    // Calculate the first day of the month and the number of days in the month
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    let date = 1; // Calendar starts at the first day of the month

    // Generate the calendar for a month
    for (let row = 0; row < 6; row++) {
      const weekRow = document.createElement("tr");

      for (let cell = 0; cell < 7; cell++) {
        if ((row === 0 && cell < firstDayOfMonth) || date > daysInMonth) {
          weekRow.appendChild(document.createElement("td")); // Empty cell for alignment
        } else {
          const dateCell = document.createElement("td");
          dateCell.textContent = date.toString();
          weekRow.appendChild(dateCell);
          date++; // Move to the next date
        }
      }

      // Add the current row to the table
      tableBody.appendChild(weekRow);

      // Stop creating rows if we've run out of dates
      if (date > daysInMonth) {
        break;
      }
    }
  }, [month, tableId]);

  // Handlers to navigate months
  const goToPreviousMonth = () => {
    setMonth(month > 1 ? month - 1 : 12);
  };

  const goToNextMonth = () => {
    setMonth(month < 12 ? month + 1 : 1);
  };

  return (
    <div className="calendar">
      <div className="calendar-navigation">
        <button onClick={goToPreviousMonth} disabled={month === 1}>
          &lt; Prev
        </button>
        <span>{`${year}-${month.toString().padStart(2, "0")}`}</span>
        <button onClick={goToNextMonth} disabled={month === 12}>
          Next &gt;
        </button>
      </div>
      <table id={tableId}>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default Calendar;
