import Link from "next/link";

function Navigation({ params }) {
  return (
    <div className="agenda-header">
      <div className="row mb-3">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <h2 className="agenda-title mb-0">Org Agenda</h2>
        </div>
        <div className="col-12 col-md-6">
          <div className="agenda-controls d-flex flex-wrap justify-content-md-end">
            <Link
              className="btn btn-outline-secondary btn-sm mr-1 mb-1"
              href={params?.offset ? `${params.offset - 1}` : "/calender/-1"}
            >
              &larr;
            </Link>
            <Link
              className="btn btn-outline-primary btn-sm mr-1 mb-1"
              href="/calender"
            >
              Today
            </Link>
            <Link
              className="btn btn-outline-secondary btn-sm mr-1 mb-1"
              href={
                params?.offset ? `${Number(params.offset) + 1}` : "/calender/1"
              }
            >
              &rarr;
            </Link>
            <Link className="btn btn-primary btn-sm mb-1" href="/update-task">
              Add Task
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
