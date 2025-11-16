import AgendaItem from "./AgendaItem";
import { getDateString, getFormattedDate } from "../_utils/helper";
import { getAgenda, getUser } from "../_lib/data-service";

// Helper function to format time
const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

async function DayEntry({ day, session }) {
  let agendas = [];
  if (session?.user?.email) {
    const user = await getUser(session.user.email);
    agendas = await getAgenda(getDateString(day), user[0].id);
  }

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
