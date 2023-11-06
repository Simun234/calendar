import React, { useState } from "react";
import "./App.css";
import Calendar from "./component/Calendar";

function App() {
  // Start with the current month and year or any default you find suitable
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Months are 0-indexed in JavaScript Date

  // Month names array to convert month number to month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // The year is fixed as per your Calendar component
  const year = 2023;

  return (
    <div>
      <h1>{`${monthNames[month - 1]} ${year}`}</h1>
      <Calendar tableId="MyTable" month={month} setMonth={setMonth} />
    </div>
  );
}

export default App;
