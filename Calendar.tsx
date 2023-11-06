// Calendar.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

interface CalendarProps {
  tableId: string;
  month: number;
  setMonth: (month: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ tableId, month, setMonth }) => {
  const year = 2023; // Fixed year for example purposes
  const [commitData, setCommitData] = useState<any[]>([]);

  useEffect(() => {
    // Function to fetch commit data
    const fetchCommits = async () => {
      const since = new Date(year, month - 1, 1).toISOString();
      const until = new Date(year, month, 0).toISOString();

      try {
        const response = await axios.get(
          `https://api.github.com/repos/facebook/react/commits`,
          {
            params: {
              since: since,
              until: until,
            },
          }
        );
        setCommitData(response.data);
      } catch (error) {
        console.error("Error fetching commit data:", error);
      }
    };

    fetchCommits();
  }, [month]);

  // Function to display commit details in an alert or modal
  const displayCommitDetails = (commitInfo: any) => {
    // Placeholder for displaying details - replace with your own component or UI display logic
    alert(
      `Commits on this day:\n${commitInfo
        .map((commit: any) => commit.commit.message)
        .join("\n")}`
    );
  };

  useEffect(() => {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    if (!tableBody) {
      console.error(`Table body for table '${tableId}' not found.`);
      return;
    }

    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }

    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    let date = 1;
    for (let row = 0; row < 6; row++) {
      const weekRow = document.createElement("tr");

      for (let cell = 0; cell < 7; cell++) {
        const dateCell = document.createElement("td");
        if (row === 0 && cell < firstDayOfMonth) {
          weekRow.appendChild(dateCell);
        } else if (date > daysInMonth) {
          weekRow.appendChild(dateCell);
          continue;
        } else {
          const currentDate = new Date(year, month - 1, date);
          const commitInfo = commitData.filter(
            (commit) =>
              new Date(commit.commit.committer.date).toDateString() ===
              currentDate.toDateString()
          );

          dateCell.textContent = date.toString();
          if (commitInfo.length > 0) {
            const commitIndicator = document.createElement("span");
            commitIndicator.className = "commit-indicator";
            commitIndicator.title = commitInfo
              .map((commit) => commit.commit.message)
              .join("\n");
            commitIndicator.textContent = "C";
            commitIndicator.onclick = () => displayCommitDetails(commitInfo);
            dateCell.appendChild(commitIndicator);
          }

          weekRow.appendChild(dateCell);
          date++;
        }
      }
      tableBody.appendChild(weekRow);
      if (date > daysInMonth) {
        break;
      }
    }
  }, [commitData, month, tableId, year]);

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
};

export default Calendar;
