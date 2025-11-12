import { useEffect, useState } from "react";
import AgendaItem from "./AgendaItem";
import { getDateString, getFormattedDate } from "../utils/helper";
import { getAgenda } from "../services/apiAgenda";

// Helper function to format time
const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

function DayEntry({ day }) {
  const [agendas, setAgendas] = useState([]);
  useEffect(
    function () {
      getAgenda(getDateString(day)).then((data) => setAgendas(data));
    },
    [day]
  );

  const today = new Date();

  // Check if day is the same as today
  const isToday =
    day.getDate() === today.getDate() &&
    day.getMonth() === today.getMonth() &&
    day.getFullYear() === today.getFullYear();

  return (
    <li className="day-entry">
      <div className="day-header">
        <h4>
          {isToday && "* "}
          {getFormattedDate(day)}
        </h4>
      </div>
      {agendas.length !== 0 && (
        <ul className="agenda-items">
          {agendas.map((agenda) => (
            <AgendaItem agenda={agenda} key={agenda.id} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default DayEntry;
