function App() {
  // Sample static data
  const current = 0;

  const days = [
    {
      formattedDate: "Monday, November 11, 2025",
      agendaCounts: 3,
      agendaEntries: [
        {
          id: 1,
          type: 0, // 0 = TODO
          startTime: new Date("2025-11-11T09:00:00"),
          endTime: new Date("2025-11-11T10:00:00"),
          title: "Team meeting: Project review",
        },
        {
          id: 2,
          type: 1, // 1 = DONE
          startTime: new Date("2025-11-11T14:00:00"),
          endTime: new Date("2025-11-11T15:30:00"),
          title: "Client presentation",
        },
        {
          id: 3,
          type: 0,
          startTime: new Date("2025-11-11T16:00:00"),
          endTime: new Date("2025-11-11T17:00:00"),
          title: "Code review session",
        },
      ],
    },
    {
      formattedDate: "Tuesday, November 12, 2025",
      agendaCounts: 2,
      agendaEntries: [
        {
          id: 4,
          type: 0,
          startTime: new Date("2025-11-12T10:00:00"),
          endTime: new Date("2025-11-12T11:00:00"),
          title: "Sprint planning",
        },
        {
          id: 5,
          type: 1,
          startTime: new Date("2025-11-12T15:00:00"),
          endTime: new Date("2025-11-12T16:00:00"),
          title: "Documentation update",
        },
      ],
    },
    {
      formattedDate: "Wednesday, November 13, 2025",
      agendaCounts: 0,
      agendaEntries: [],
    },
  ];

  // Helper function to format time
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="nk-container">
      <header className="bg-dark sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-dark">
            <div
              className="navbar-nav w-100 d-flex flex-column flex-md-row"
              id="navbarSupportedContent"
            >
              <a className="nav-link ml-3" href="/index">
                Register
              </a>
              <a className="nav-link ml-3" href="/index">
                Login
              </a>
              <a className="nav-link ml-3" href="/index">
                Logout
              </a>
            </div>
          </nav>
        </div>
      </header>

      <div className="main">
        <div className="container agenda-container">
          {/* Agenda Header */}
          <div className="agenda-header">
            <div className="row mb-3">
              <div className="col-12 col-md-6 mb-2 mb-md-0">
                <h2 className="agenda-title mb-0">Org Agenda</h2>
              </div>
              <div className="col-12 col-md-6">
                <div className="agenda-controls d-flex flex-wrap justify-content-md-end">
                  <a
                    className="btn btn-outline-secondary btn-sm mr-1 mb-1"
                    href={`/index?current=${current - 1}`}
                  >
                    &larr;
                  </a>
                  <a
                    className="btn btn-outline-primary btn-sm mr-1 mb-1"
                    href="/index"
                  >
                    Today
                  </a>
                  <a
                    className="btn btn-outline-secondary btn-sm mr-1 mb-1"
                    href={`/index?current=${current + 1}`}
                  >
                    &rarr;
                  </a>
                  <a className="btn btn-primary btn-sm mb-1" href="/add">
                    Add Task
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Agenda View */}
          <ul className="agenda-view">
            {/* Day Entry */}
            {days.map((day, dayIndex) => (
              <li className="day-entry" key={dayIndex}>
                <div className="day-header">
                  <h4>{day.formattedDate}</h4>
                </div>
                {day.agendaCounts !== 0 && (
                  <ul className="agenda-items">
                    {day.agendaEntries.map((agenda) => (
                      <li
                        className={`agenda-item ${
                          agenda.type === 0 ? "todo" : "done"
                        }`}
                        key={agenda.id}
                      >
                        <div className="item-time">
                          <span>{formatTime(agenda.startTime)}</span>-
                          <span>{formatTime(agenda.endTime)}</span>
                        </div>
                        <div className="item-content">
                          <span
                            className={
                              agenda.type === 0
                                ? "todo-keyword"
                                : "done-keyword"
                            }
                          >
                            {agenda.type === 0 ? "TODO" : "DONE"}
                          </span>
                          <a
                            className="item-title"
                            href={`/update/${agenda.id}`}
                          >
                            {agenda.title}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
