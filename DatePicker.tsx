import React from "react";
import { Calendar } from "./Calendar";

export const DatePicker: React.FC<{}> = ({}) => {
  return (
    <div className="date-picker-container">
      <Calendar />
    </div>
  );
};
