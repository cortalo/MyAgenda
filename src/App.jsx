import { useEffect, useState } from "react";
import DayEntry from "./DayEntry";
import Header from "./Header";
import Navigation from "./Navigation";
import { getAgenda } from "./services/apiAgenda";
import { getDateString, getWeekDates } from "./utils/helper";

function App() {
  // Sample static data

  const [agendas, setAgendas] = useState([]);

  useEffect(function () {
    const today = new Date();
    getAgenda(getDateString(today)).then((data) => setAgendas(data));
  }, []);

  console.log(agendas);

  // const current = 0;

  const days = getWeekDates(new Date());

  return (
    <div className="nk-container">
      <Header />
      <div className="main">
        <div className="container agenda-container">
          <Navigation />
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
