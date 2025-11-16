import Link from "next/link";
import { auth } from "../../_lib/auth";
import { redirect } from "next/navigation";
import DateSelector from "../../_components/DateSelector";
import { getAgendaById, getUser, insertData } from "../../_lib/data-service";
import supabase from "@/app/_lib/supabase";

async function addEntry(formdata) {
  "use server";

  let actualRepeat = 0;
  let isRepeat = false;
  if (Number(formdata.get("repeatType")) === 1) {
    actualRepeat = Number(formdata.get("repeatNum")) * 7;
    isRepeat = true;
  } else if (Number(formdata.get("repeatType")) === 2) {
    actualRepeat = Number(formdata.get("repeatNum"));
    isRepeat = true;
  }

  const { data, erorr } = await supabase
    .from("agenda")
    .update({
      event: formdata.get("title"),
      description: formdata.get("content"),
      date: formdata.get("date"),
      startTime: formdata.get("startTime"),
      endTime: formdata.get("endTime"),
      repeatType: formdata.get("repeatType"),
      repeatNum:
        formdata.get("repeatNum") === "" ? 0 : formdata.get("repeatNum"),
      type: formdata.get("status"),
      actualRepeat: actualRepeat,
      isRepeat: isRepeat,
    })
    .eq("id", formdata.get("agendaId"))
    .select();

  redirect("/");
}

async function page({ params }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  const user = await getUser(session.user.email);
  const thisAgendas = await getAgendaById(params.agendaId);
  const thisAgenda = thisAgendas[0];

  if (
    thisAgenda.length === 0 ||
    Number(thisAgenda.userId) !== Number(user[0].id)
  ) {
    redirect("/");
  }
  return (
    <div className="main">
      <div className="container px-3 px-md-5 pt-3 pb-3 mt-3 mb-3">
        <h3 className="text-center text-info border-bottom pb-3">
          Update Task
        </h3>
        <form className="mt-5" action={addEntry}>
          <input hidden name="agendaId" value={thisAgenda.id} />
          <div className="form-group row">
            <label
              htmlFor="title"
              className="col-12 col-md-2 col-form-label text-md-right"
            >
              Title:
            </label>
            <div className="col-12 col-md-10">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Enter task title"
                defaultValue={thisAgenda.event}
                required
              />
            </div>
          </div>

          <div className="form-group row mt-4">
            <label
              htmlFor="content"
              className="col-12 col-md-2 col-form-label text-md-right"
            >
              Description:
            </label>
            <div className="col-12 col-md-10">
              <input
                type="text"
                className="form-control"
                name="content"
                placeholder="(Optional) task description"
                defaultValue={thisAgenda.description}
              />
            </div>
          </div>

          <div className="form-group row mt-4">
            <label
              htmlFor="date"
              className="col-12 col-md-2 col-form-label text-md-right"
            >
              Date:
            </label>
            <DateSelector thisAgenda={thisAgenda} />
          </div>

          <div className="form-group row mt-4">
            <label
              htmlFor="startTime"
              className="col-12 col-md-2 col-form-label text-md-right"
            >
              Time:
            </label>
            <div className="col-12 col-md-5">
              <input
                type="time"
                className="form-control"
                name="startTime"
                placeholder="Start Time"
                defaultValue={thisAgenda.startTime}
                required
              />
            </div>
            <div className="col-12 col-md-5">
              <input
                type="time"
                className="form-control"
                name="endTime"
                placeholder="End Time"
                defaultValue={thisAgenda.endTime}
                required
              />
            </div>
          </div>

          <div className="form-group row mt-4">
            <label
              htmlFor="repeat"
              className="col-12 col-md-2 col-form-label text-md-right"
            >
              Repeat:
            </label>
            <div className="col-12 col-md-5">
              <select
                className="form-control"
                name="repeatType"
                required
                defaultValue={thisAgenda.repeatType}
              >
                <option value="0">No Repeat</option>
                <option value="1">Repeat By Weeks</option>
                <option value="2">Repeat By Days</option>
              </select>
            </div>
            <div className="col-12 col-md-5">
              <input
                type="text"
                className="form-control"
                name="repeatNum"
                placeholder="(Optional) repeat num"
                defaultValue={thisAgenda.repeatNum}
              />
            </div>
          </div>

          <div className="form-group row mt-4">
            <label
              htmlFor="type"
              className="col-12 col-md-2 col-form-label text-md-right"
            >
              Status:
            </label>
            <div className="col-12 col-md-10">
              <select
                className="form-control"
                name="status"
                defaultValue={thisAgenda.type}
                required
              >
                <option value="">Select status</option>
                <option value="0">TODO</option>
                <option value="1">DONE</option>
              </select>
            </div>
          </div>

          <div className="form-group row mt-4">
            <div className="col-12 col-md-2"></div>
            <div className="col-12 col-md-10 text-center">
              <button
                type="submit"
                className="btn btn-info text-white form-control"
              >
                Update Task
              </button>
            </div>
          </div>

          <div className="form-group row mt-2">
            <div className="col-12 col-md-2"></div>
            <div className="col-12 col-md-10 text-center">
              <Link
                type="button"
                className="btn btn-secondary form-control"
                href="/"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
