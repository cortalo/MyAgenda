function Navigation() {
  return (
    <div className="agenda-header">
      <div className="row mb-3">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <h2 className="agenda-title mb-0">Org Agenda</h2>
        </div>
        <div className="col-12 col-md-6">
          <div className="agenda-controls d-flex flex-wrap justify-content-md-end">
            <a className="btn btn-outline-secondary btn-sm mr-1 mb-1">&larr;</a>
            <a
              className="btn btn-outline-primary btn-sm mr-1 mb-1"
              href="/index"
            >
              Today
            </a>
            <a className="btn btn-outline-secondary btn-sm mr-1 mb-1">&rarr;</a>
            <a className="btn btn-primary btn-sm mb-1" href="/add">
              Add Task
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
