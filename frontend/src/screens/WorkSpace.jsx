import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
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



import Output from "../components/Output.jsx";

import NodeBar from "../components/NodeBar.jsx";

import NodeCats from "../components/nodeCats.jsx";
import NavBar from "../components/NavBar.jsx";
import { nodeType } from "../assets/nodesArray.jsx";
import { NodesContext } from "../context/NodesContext.jsx";
import { Save, SaveAltRounded } from "@mui/icons-material";
import api from "../assets/api.js";

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


function WorkSpace() {

  const { nodes, setNodes, edges ,setEdges , onEdgesChange, onNodesChange, display, setDisplay,currentProject } =
    useContext(NodesContext);

    const [title , setTitle ]= useState(currentProject.title)
  const edgeUpdateSuccessful = useRef(true);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [catSelected,setCatSelected]=useState("control")

  const [leftMenu,setLeftMenu]=useState(true);
  const [RightMenu,setRightMenu]=useState(false);


  const [scrn,setScrn]=useState("app");
  const [scrns,setScrns]=useState(["app","styles"])

  useMemo(()=>{
    setEdges(JSON.parse(localStorage.getItem("edges"))||[])
    setNodes(JSON.parse(localStorage.getItem("nodes"))||[])
    setScrns(JSON.parse(localStorage.getItem("screens"))||["app","styles"])
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
  useEffect(()=>{
    if(scrns){
      localStorage.setItem("screens",JSON.stringify(scrns))
    }
  },[scrns])




  const [screen,setScreen]=useState(0)
  


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
      };

      const newTextNode={
        type,
        position,
        ...newNode,
        data: { onChange: onChange , text: "" ,id:newNode.id ,"screen":scrn},
      }

      setNodes((nds) => nds.concat(newTextNode));
    },
    [reactFlowInstance,scrn]
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const copyToClipBoard=()=>{
    const selectedNodes= nodes.filter(node=>node.selected==true&&node.data?.screen==scrn)
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
        setCatSelected('nothing')
      }else{
        setCatSelected(catName)
        setLeftMenu(true)
      }
  }

  const [filterNodes,setFilterNodes]=useState([])
  useEffect(() => {
    setFilterNodes(nodes.filter((node)=>node.data?.screen==scrn ))

    if(scrn!="app"){
      setFilterNodes(p=>p.filter(node=>node.type!="Start"))
    }
  }, [nodes])
  useEffect(() => {
    setFilterNodes(nodes.filter((node)=>node.data?.screen==scrn ))

    if(scrn!="app"){
      setFilterNodes(p=>p.filter(node=>node.type!="Start"))
    }
  }, [scrn,nodes])
  







  const saveProject = ()=>{
    api.post("/projects/save-data/"+currentProject._id,{
      data:JSON.stringify({edges,nodes,screens:scrns}),
      title,
    }).then((res)=>{
    })
  }











  return (
      <div className="flex flex-col w-screen h-screen ">
        <div className="flex justify-between  border-b h-12">

        <div className="w-full bg-white  flex px-4 gap-1 ">
          {
            scrns.map((s,key)=>{
              return(
                <button key={key} onClick={()=>{setScrn(s)}} className={"px-4 py-1 mt-2 rounded-t-xl border "+(s==scrn&&" bg-blue-400 text-white")}>{s}</button>
              )
            })
          }
          <button onClick={()=>setScrns(p=>p.concat(prompt("name of the screen!")))} className="px-8 py-1 mt-2 rounded-t-xl border  ">+</button>
        </div>
        <div className="flex h-full items-center gap-2 px-2 ">
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="border outline-blue-400 py-1 rounded-lg px-2" ></input>
          <button onClick={saveProject} className="bg-blue-400 rounded-lg py-2 flex gap-2 text-white px-4">
            <Save></Save> save</button>
        </div>
        </div>

        <ReactFlowProvider >
          <div  className="flex-1 h-full w-full flex" ref={reactFlowWrapper}>
            <NavBar screen={screen} setScreen={setScreen}/>

          {
            screen==1 && 
            <div className="flex justify-center  flex-1">
              <Output screen={screen}/>
            </div>
          }

          {
            screen==0 && <>


            <NodeCats HandleCatSelect={HandleCatSelect} catSelected={catSelected}/>
            {
              leftMenu &&
              <NodeBar scrn={scrn} catSelected={catSelected} onDragStart={onDragStart}/>
            }
            <ReactFlow
              className="resize horizontal border-x-[2px] flex-1 min-w-[800px] "
              nodes={filterNodes}
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
              <Background className="bg-[#fcfcfd]" color="#888" variant={"dots"} />
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
                <Output screen={screen}/>
            }

            </>
          }

          </div>
        </ReactFlowProvider>
      </div>
  )
}

export default WorkSpace