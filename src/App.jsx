import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import "./App.css";
import MealLayout from "./layouts/MealLayout";
import MealDetail from "./pages/MealDetail";
import Whitelist from "./pages/Whitelist";
import { Toaster } from "react-hot-toast";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="meal/:id" element={<MealDetail />} />
          <Route path="whitelist" element={<Whitelist />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
