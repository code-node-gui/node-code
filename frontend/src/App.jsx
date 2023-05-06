import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  ReactFlowProvider,
  SelectionMode,
  applyNodeChanges,
  useNodesState,
  useEdgesState,
  updateEdge,
  Handle,
} from "reactflow";
import "reactflow/dist/style.css";

import { NodesContext } from "./context/NodesContext.jsx";


import Output from "./components/Output.jsx";

import { cats } from "./assets/cats.js";
import NodeBar from "./components/NodeBar.jsx";
import { SettingsBrightness } from "@mui/icons-material";
import { Avatar } from "@mui/material";

import allNodesArray, { nodeType } from "./assets/nodesArray"

const rfStyle = {
  backgroundColor: "#f0f0f0",
};

function componentDidMount() {
  // document.addEventListener('contextmenu', (e) => {
  //   e.preventDefault();
  // });
};


const panOnDrag = [1, 2];
const edgeOptions = {
  animated: false,
  style: {
    stroke: "#333",
    strokeWidth: "1px",
  },
  type: 'smoothstep',
};

const connectionLineStyle = { stroke: "#555" };
const nodeTypes = nodeType

function Flow() {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [display, setDisplay] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [catSelected,setCatSelected]=useState("control")

  const [leftMenu,setLeftMenu]=useState(false);
  const [RightMenu,setRightMenu]=useState(false);
 

  useMemo(()=>{
    setEdges(JSON.parse(localStorage.getItem("edges"))||[])
    setNodes(JSON.parse(localStorage.getItem("nodes"))||[])
    componentDidMount()
  },[])

  useEffect(()=>{
    if(nodes){
      localStorage.setItem("nodes",JSON.stringify(nodes))
    }
  },[nodes])
  useEffect(()=>{
    if(edges){
      localStorage.setItem("edges",JSON.stringify(edges))
    }
  },[edges])




  const [nodesArray, setNodeArray] = useState(allNodesArray);

  


    const onChange = (v,id) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== id) {
            return node;
          }

          const value = v;


          return {
            ...node,
            data: {
              ...node.data,
              value,
            },
          };
        })
      );
    };





  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left - 200,
        y: event.clientY - reactFlowBounds.top,
      });

      

      const newNode = {
        id: type == "Start" ? "start" : "node_"+Math.random(),
        type,
        position,
      };

      const newTextNode={
        ...newNode,
        data: { onChange: onChange , text: "" ,id:newNode.id},
      }

      setNodes((nds) => nds.concat(newTextNode));
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const copyToClipBoard=()=>{
    const selectedNodes= nodes.filter(node=>node.selected==true)
    navigator.clipboard.writeText(JSON.stringify(selectedNodes));
  }


  useEffect(()=>{
    const displayEvntKey = function(event) {
        if (event.ctrlKey && event.key == "c") {
          copyToClipBoard()
        }
        if (event.ctrlKey && event.key == "v") {
          past()
      }
    }

    document.addEventListener("keydown", displayEvntKey)
    return () => document.removeEventListener("keydown", displayEvntKey)
  },[nodes])
  
  const past=()=>{
    navigator.clipboard.readText().then(get => {
      const selectedNodes=JSON.parse(get)
      if(selectedNodes){

        
        const duplicateNodes=[]
        const nodesId=selectedNodes.map(node=>node.id)
    setNodes(nds=>nds.map(nd=>({...nd,selected:false})))


    selectedNodes.forEach((node)=>{

      const newNode = {
        id: node.type == "Start" ? "start" : "node_"+Math.random(),
        type:node.type,
        position:{x:node.position.x+20,y:node.position.y+20},
        selected:true
      };
      const newTextNode={
        ...newNode,
        data:{...node.data,id:newNode.id}
      }
      duplicateNodes.push(newTextNode);
    })
    
    setNodes(nds=>nds.concat(duplicateNodes))
    
    edges.forEach(edge=>{
      let newEdge = edge
      if(nodesId.includes(edge.source)&&nodesId.includes(edge.target)){
        let source =  duplicateNodes[selectedNodes.findIndex(node=>node.id == edge.source)].id
        let target =  duplicateNodes[selectedNodes.findIndex(node=>node.id == edge.target)].id
        setEdges(eds=>eds.concat({...newEdge,source,target,id: "edge"+Math.random()}))
      }
    
    })
  }
  });
  }


  

  const HandleCatSelect=(catName)=>{
      if(catName==catSelected){
        setLeftMenu(p=>!p)
      }else{
        setCatSelected(catName)
        setLeftMenu(true)
      }
  }
  return (
    <NodesContext.Provider value={{ nodes, setNodes, onNodesChange,edges, setEdges, onEdgesChange,display,setDisplay }}>
      <div className="flex flex-col w-screen h-screen ">

        <div className="w-full bg-white border-b flex justify-center gap-1 ">
          <button className="px-4 py-2 mt-1 rounded-t-xl border bg-blue-400 text-white">App</button>
          <button className="px-4 py-2 mt-1 rounded-t-xl border ">homepage</button>
          <button className="px-8 py-2 mt-1 rounded-t-xl border  ">+</button>
        </div>

        <ReactFlowProvider >
          <div  className="flex-1 h-full w-full flex" ref={reactFlowWrapper}>
            <div id="workspace" className="flex items-center justify-between flex-col bg-gray-50">
              <div className="flex flex-col">
              {
                cats.map((cat,key)=>{
                  return(
                  <button key={key} onClick={()=>HandleCatSelect(cat.name)} className={"px-3   py-2 "+(cat.name==catSelected?"bg-blue-400 text-white":" text-gray-700 ")}>
                    <div className="text-sm font-semibold text-start">{cat.name}</div>
                  </button>
                  )
                })
              }
              </div>
               <Avatar src="https://media.licdn.com/dms/image/D4E03AQHeSrHnPRoVLw/profile-displayphoto-shrink_800_800/0/1682257781027?e=2147483647&v=beta&t=lggJy-TJsQPuvLs29DtTaELPFL-xJt9ptrZ87zcVuSs" className="m-4 cursor-pointer"/>
            </div>
            {
              leftMenu &&
              <NodeBar catSelected={catSelected} onDragStart={onDragStart}/>
            }
            <ReactFlow
              className="resize horizontal flex-1 min-w-[800px]"
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              connectionLineStyle={connectionLineStyle}
              defaultEdgeOptions={edgeOptions}
              style={rfStyle}
              selectionOnDrag
              panOnDrag={panOnDrag}
              selectionMode={SelectionMode.Partial}
            >
              <Controls className="bg-white" />
              <MiniMap zoomable pannable className="bg-gray-400" />
              <Background color="#ddd" variant={"lines"} />
            </ReactFlow>
            <button onClick={()=>setRightMenu(p=>!p)} className="absolute p-2 rounded-md right-2 top-14 text-white bg-blue-400 ">
              {
              !RightMenu?
              <KeyboardArrowRightRoundedIcon/>
              :
              <CloseRoundedIcon/>
              }
              </button>
            {
              RightMenu &&
                <Output/>
            }
          </div>
        </ReactFlowProvider>
      </div>
    </NodesContext.Provider>
  );
}

export default Flow;
