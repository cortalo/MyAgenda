import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Agendas from "./pages/Agendas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Agendas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
