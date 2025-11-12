import { useState } from "react";
import { Link } from "react-router-dom";

const UpdateTask = () => {
  const [formData, setFormData] = useState({
    title: "Sample Task Title",
    content: "This is a sample task description",
    date: "2024-03-15",
    startTime: "09:00",
    endTime: "10:30",
    repeatType: "0",
    repeatNum: "",
    status: "0",
  });

  const [dayName, setDayName] = useState("Friday");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateDayName = (dateString) => {
    const date = new Date(dateString);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setDayName(days[date.getDay()]);
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, date: value }));
    updateDayName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="main">
      <div className="container px-3 px-md-5 pt-3 pb-3 mt-3 mb-3">
        <h3 className="text-center text-info border-bottom pb-3">
          Update Task
        </h3>
        <form className="mt-5" onSubmit={handleSubmit}>
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
                value={formData.title}
                id="title"
                placeholder="Enter task title"
                required
                onChange={handleInputChange}
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
                value={formData.content}
                id="content"
                placeholder="(Optional) task description"
                onChange={handleInputChange}
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
            <div className="col-12 col-md-5">
              <input
                type="date"
                className="form-control"
                name="date"
                value={formData.date}
                id="date"
                required
                onChange={handleDateChange}
              />
            </div>
            <div className="col-12 col-md-5">
              <span className="input-group-text" id="dayName">
                {dayName}
              </span>
            </div>
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
                value={formData.startTime}
                id="startTime"
                placeholder="Start Time"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-5">
              <input
                type="time"
                className="form-control"
                name="endTime"
                value={formData.endTime}
                id="endTime"
                placeholder="End Time"
                required
                onChange={handleInputChange}
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
                id="repeat"
                value={formData.repeatType}
                required
                onChange={handleInputChange}
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
                value={formData.repeatNum}
                id="repeatNum"
                placeholder="(Optional) repeat num"
                onChange={handleInputChange}
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
                id="type"
                value={formData.status}
                required
                onChange={handleInputChange}
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
                to="/"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
