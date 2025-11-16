import Link from "next/link";

function AgendaItem({ agenda }) {
  const formatTime = (time) => time.slice(0, 5); // Remove seconds (HH:MM:SS -> HH:MM)

  return (
    <li className={`agenda-item ${agenda.type === 0 ? "todo" : "done"}`}>
      <div className="item-time">
        <span>{formatTime(agenda.startTime)}</span>-<span>{formatTime(agenda.endTime)}</span>
      </div>
      <div className="item-content">
        <span className={agenda.type === 0 ? "todo-keyword" : "done-keyword"}>
          {agenda.type === 0 ? "TODO" : "DONE"}
        </span>
        <Link className="item-title" href={`/update/${agenda.id}`}>
          {agenda.event}
        </Link>
      </div>
    </li>
  );
}

export default AgendaItem;
