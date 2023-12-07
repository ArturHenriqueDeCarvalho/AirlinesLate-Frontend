import { Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage/index";
import SinginPage from "./pages/SinginPage/index";
import ExhibitionPage from "./pages/ExhibitionPage/index";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<SinginPage />} />
      <Route path="/Upload" element={<UploadPage />} />
      <Route path="/exhibition/" element={<ExhibitionPage />} />
    </Routes>
  );
}

export default AppRouter;
