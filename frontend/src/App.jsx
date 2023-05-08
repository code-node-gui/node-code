import { useEdgesState, useNodesState } from "reactflow";
import { NodesContext } from "./context/NodesContext";
import { useEffect, useState } from "react";
import WorkSpace from "./screens/WorkSpace";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./screens/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Profile />,
  },
  {
    path: "/work-space",
    element: <WorkSpace />,
  },
]);

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [display, setDisplay] = useState([]);
  const [Projects,setProjects]=useState([]);


  const value = {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    display,
    setDisplay,
    Projects,
    setProjects
  };

  return (
    <NodesContext.Provider value={value}>
      <RouterProvider router={router} />
    </NodesContext.Provider>
  );
}

export default Flow;
