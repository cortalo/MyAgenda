import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="nk-container">
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
