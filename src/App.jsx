import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Agendas from "./pages/Agendas";
import UpdateTask from "./pages/UpdateTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Agendas />} />
          <Route path="update" element={<UpdateTask />} />
          <Route path="add" element={<UpdateTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
