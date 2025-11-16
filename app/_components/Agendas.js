import { auth } from "../_lib/auth";
import { getWeekDates } from "../_utils/helper";
import DayEntry from "./DayEntry";
import Navigation from "./Navigation";

async function Agendas({ params }) {
  const defaultToday = new Date();
  let today = new Date();
  if (params && "offset" in params) {
    today.setDate(defaultToday.getDate() + 7 * Number(params.offset));
  }
  const days = getWeekDates(today);

  const session = await auth();

  return (
    <div className="main">
      <div className="container agenda-container">
        <Navigation params={params} />
        <ul className="agenda-view">
          {days.map((day, dayIndex) => (
            <DayEntry day={day} key={dayIndex} session={session} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Agendas;
