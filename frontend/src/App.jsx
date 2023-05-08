import { useEdgesState, useNodesState } from "reactflow";
import {NodesContext} from "./context/NodesContext"
import { useState } from "react";
import WorkSpace from "./screens/WorkSpace";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Profile from "./screens/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Profile/>,
  },
  {
    path: "/work-space",
    element: <WorkSpace/>,
  },
]);

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [display, setDisplay] = useState([]);

  return (
    <NodesContext.Provider value={{ nodes, setNodes, onNodesChange,edges, setEdges, onEdgesChange,display,setDisplay }}>
        <RouterProvider router={router} />
    </NodesContext.Provider>
  );
}

export default Flow;
