import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import "./App.css";
import MealLayout from "./layouts/MealLayout";
import MealDetail from "./pages/MealDetail";
import Whitelist from "./pages/Whitelist";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import SearchPage from "./pages/SearchPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="meal/:id" element={<MealDetail />} />
          <Route path="whitelist" element={<Whitelist />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <Toaster position="top-right" />
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </>
  );
};

export default App;
