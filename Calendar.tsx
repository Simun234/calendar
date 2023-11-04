import React from "react";
import "../App.css";

interface CalendarProps {
  currentMonth: Date;
}

const Calendar: React.FC<CalendarProps> = ({}) => {
  // Funkcija za dobivanje prvog dana u trenutnom mjesecu
  function getFirstDayOfCurrentMonth(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }
  // Funkcija za dobivanje broja dana u trenutnom mjesecu

  const firstDayOfCurrentMonth = getFirstDayOfCurrentMonth();
  console.log(firstDayOfCurrentMonth);

  // Stvaranje niza koji će sadržavati dane u mjesecu

  // Renderiranje kalendara
  return (
    <div className="calendar">
      <div className="header">
        <table>
          <thead>
            <tr>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
            <tr>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
            </tr>
            <tr>
              <td>15</td>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>19</td>
              <td>20</td>
              <td>21</td>
            </tr>
            <tr>
              <td>22</td>
              <td>23</td>
              <td>24</td>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
            </tr>
            <tr>
              <td>29</td>
              <td>30</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
