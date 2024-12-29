import { CssBaseline, Typography } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppProvider from "./app-provider";
import ProtectedRoutes from "./components/protected-routes";
import Compare from "./pages/compare";
import Home from "./pages/home";
import Insights from "./pages/insights";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppProvider />,
      children: [
        {
          path: "/",
          element: <ProtectedRoutes />,
          children: [
            {
              path: "/profile",
              element: <Profile />,
            },
            {
              path: "/compare",
              element: <Compare />,
            },
          ],
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/insights/:univId",
          element: <Insights />,
        },
        {
          path: "*",
          element: <Typography variant="h1">Page not found!!</Typography>,
        },
      ],
    },
  ]);

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
