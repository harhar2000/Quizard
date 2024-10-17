import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
