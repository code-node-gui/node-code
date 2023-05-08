import { useEdgesState, useNodesState } from "reactflow";
import { NodesContext } from "./context/NodesContext";
import { useEffect, useMemo, useState } from "react";
import WorkSpace from "./screens/WorkSpace";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./screens/Profile";
import api from "./assets/api";

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
  const [projects,setProjects]=useState([]);
  const [updateProjects,setUpdateProjects]=useState(0);
  const [currentProject,setCurrentProject]=useState("");


  const value = {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    display,
    setDisplay,
    projects,
    setProjects,
    updateProjects,
    setUpdateProjects,
    currentProject,
    setCurrentProject
  };


  useMemo(()=>{
    let getProject= JSON.parse(localStorage.getItem("currentProject"));
    if(getProject){
      setCurrentProject(getProject)
    }
  },[])

  return (
    <NodesContext.Provider value={value}>
      <RouterProvider router={router} />
    </NodesContext.Provider>
  );
}

export default Flow;
