import { useState } from "react";
import "./App.css";
import Calendar from "./component/Calendar";

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  document.addEventListener("DOMContentLoaded", () => {
    const prevButton = document.getElementById("prevButton");

    prevButton.addEventListener("click", displayLastMonth);

    function displayLastMonth() {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 1); // Go back one month

      const lastMonth = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });

      const lastMonthDays = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
    }
  });

  // Add an event listener to a "prev" button in your HTML to call the function when it's clicked.
  const prevButton = document.getElementById("prevButton");
  prevButton?.addEventListener("click", displayLastMonth);

  function someFunctionThatReturnsDate(): Date {
    return new Date();
  }
  const result = someFunctionThatReturnsDate();
  console.log(result);

  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  return (
    <div>
      <h1>November 2023</h1>
      <button onClick={displayLastMonth}>Prev</button>
      <button onClick={goToNextMonth}>Next</button>
      <Calendar currentMonth={new Date()} />
    </div>
  );
}

export default App;
