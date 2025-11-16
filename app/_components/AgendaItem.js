import Link from "next/link";

function AgendaItem({ agenda }) {
  return (
    <li className={`agenda-item ${agenda.type === 0 ? "todo" : "done"}`}>
      <div className="item-time">
        <span>{agenda.startTime}</span>-<span>{agenda.endTime}</span>
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
