import { useCallback, useRef, useState } from "react";
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
} from "reactflow";
import "reactflow/dist/style.css";

import { NodesContext } from "./context/NodesContext.jsx";
import OutputNode from "./nodes/output/OutputNode.jsx";
import IfNode from "./nodes/control/IfNode.jsx";
import StartNode from "./nodes/control/StartNode.jsx";
import TextNode from "./nodes/input/TextNode.jsx";
import NumberNode from "./nodes/input/NumberNode.jsx";
import LoopNode from "./nodes/control/LoopNode.jsx";
import EqualNode from "./nodes/operators/EqualNode.jsx";
import BiggerNode from "./nodes/operators/Bigger.jsx";
import SmallerNode from "./nodes/operators/Smaller.jsx";
import AddNode from "./nodes/math/Add.jsx";
import SubNode from "./nodes/math/Sub.jsx";
import MulNode from "./nodes/math/Mul.jsx";
import DivNode from "./nodes/math/Div.jsx";
import TrueNode from "./nodes/operators/TrueNode.jsx";
import FalseNode from "./nodes/operators/FalseNode.jsx";
import Output from "./components/Output.jsx";
import CreateVar from "./nodes/variables/CreateVar.jsx";
import SetVar from "./nodes/variables/SetVar.jsx";
import GetVar from "./nodes/variables/GetVar.jsx";

const rfStyle = {
  backgroundColor: "#112",
};

const panOnDrag = [1, 2];

// const initialNodes = [
//   // { id: 'node-3', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123 } },
//   { id: '1', type: 'ifNode', position: { x: 0, y: 0 }, data: { value: 123 } },
//   { id: '2', type: 'ifNode', position: { x: 0, y: 0 }, data: { value: 123 } },
// ];

const edgeOptions = {
  animated: false,
  style: {
    stroke: "white",
    strokeWidth: "1px",
  },
};

const connectionLineStyle = { stroke: "white" };

const initialNodes = [
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  Output: OutputNode,
  If: IfNode,
  text: TextNode,
  number: NumberNode,
  Start: StartNode,
  TrueNode: TrueNode,
  FalseNode: FalseNode,
  Loop: LoopNode,
  Equal: EqualNode,
  Bigger: BiggerNode,
  Smaller: SmallerNode,

  Add: AddNode,
  Sub: SubNode,
  Mul: MulNode,
  Div: DivNode,

  CreateVar,
  GetVar,
  SetVar
};

let id = 0;
const getId = () => `node_${id++}`;

function Flow() {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);

  const [nodesArray, setNodeArray] = useState([
    { node: <StartNode list={true} />, type: "Start",cat:"control" },
    { node: <IfNode list={true} />, type: "If",cat:"control" },
    { node: <LoopNode list={true} />, type: "Loop" ,cat:"control"},

    { node: <TextNode list={true} />, type: "text",cat:"input" },
    { node: <NumberNode list={true} />, type: "number",cat:"input" },

    { node: <OutputNode list={true} />, type: "Output",cat:"output" },

    { node: <TrueNode list={true} />, type: "TrueNode",cat:"operators" },
    { node: <FalseNode list={true} />, type: "FalseNode",cat:"operators" },
    { node: <EqualNode list={true} />, type: "Equal" , cat:"operators"},
    { node: <BiggerNode list={true} />, type: "Bigger", cat:"operators" },
    { node: <SmallerNode list={true} />, type: "Smaller", cat:"operators" },

    { node: <AddNode list={true} />, type: "Add", cat:"math" },
    { node: <SubNode list={true} />, type: "Sub", cat:"math" },
    { node: <MulNode list={true} />, type: "Mul", cat:"math" },
    { node: <DivNode list={true} />, type: "Div", cat:"math" },


    { node: <CreateVar list={true} />, type: "CreateVar",cat:"variables" },
    { node: <SetVar list={true} />, type: "SetVar",cat:"variables" },
    { node: <GetVar list={true} />, type: "GetVar",cat:"variables" },
  ]);

  const cats = [
    {name:"control"},
    {name:"input"},
    {name:"output"},
    {name:"operators"},
    {name:"math"},
    {name:"variables"},
  ]


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
        id: type == "Start" ? "start" : getId(),
        type,
        position,
      };

      const newTextNode={
        ...newNode,
        data: { onChange: onChange, text: "" ,id:newNode.id},
      }

      setNodes((nds) => nds.concat(type=="text"||type=="number"||type=="CreateVar"||type=="SetVar"||type=="GetVar"?newTextNode:newNode));
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <NodesContext.Provider value={{ nodes, setNodes, onNodesChange,edges, setEdges, onEdgesChange }}>
      <div className="flex flex-col w-screen h-screen">
        <ReactFlowProvider>
          <div className="flex-1 h-full w-full flex" ref={reactFlowWrapper}>
            <div className="w-[200px] border-r border-[#fff3] bg-[#001] flex flex-col">
              <h1 className="text-white text-2xl p-3">Nodes</h1>

              <div className="flex flex-col items-start justify-start px-3 overflow-y-auto flex-1">
                {
                  cats.map((cat,key1)=>{
                    return(
                      <div key={key1} className="flex flex-col items-start">
                      <h3 className="text-white my-1 mt-4">{cat.name}</h3>
                      {

                      nodesArray.filter(n=>n.cat==cat.name).map((n, key) => {
                        return (
                          <div
                            key={key}
                            draggable
                            onDragStart={(event) => onDragStart(event, n.type)}
                            className="my-1"
                          >
                            {n.node}
                          </div>
                        );
                      })

                      }
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <ReactFlow
              className="flex-1"
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
            >
              <Controls className="bg-white" />
              <MiniMap zoomable pannable className="bg-gray-900" />
              <Background color="#aaa" variant={"dots"} />
            </ReactFlow>
            <div className="w-[300px] bg-[#171b26]">
                <Output/>
            </div>
          </div>
        </ReactFlowProvider>
      </div>
    </NodesContext.Provider>
  );
}

export default Flow;
