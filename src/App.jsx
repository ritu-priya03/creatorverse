import { useRoutes } from "react-router-dom";
import { useState } from "react";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const routes = useRoutes([
    { path: "/", element: <ShowCreators refresh={refresh} /> },
    { path: "/creator/:id", element: <ViewCreator /> },
    { path: "/new", element: <AddCreator setRefresh={setRefresh} /> },
    { path: "/edit/:id", element: <EditCreator setRefresh={setRefresh} /> },
    { path: "*", element: <div><h3>Not Found</h3></div> },
  ]);

  return routes;
}
