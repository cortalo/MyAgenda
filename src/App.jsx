import { useState } from "react";
import DayEntry from "./DayEntry";
import Header from "./Header";
import Navigation from "./Navigation";
import { getWeekDates } from "./utils/helper";

function App() {
  // const current = 0;

  const defaultToday = new Date();
  const [today, setToday] = useState(defaultToday);

  function todayHandler(num, isReset) {
    // const newDay = new Date();
    // newDay.setDate(today.getDate() + num);
    if (isReset) {
      setToday(new Date());
    } else {
      setToday((v) => {
        const newDay = new Date(v);
        newDay.setDate(newDay.getDate() + num);
        return newDay;
      });
    }
  }

  const days = getWeekDates(today);

  return (
    <div className="nk-container">
      <Header />
      <div className="main">
        <div className="container agenda-container">
          <Navigation todayHandler={todayHandler} />
          <ul className="agenda-view">
            {days.map((day, dayIndex) => (
              <DayEntry day={day} key={dayIndex} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
