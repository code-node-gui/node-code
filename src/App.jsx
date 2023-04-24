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

import TextUpdaterNode from "./TextUpdaterNode.jsx";
import IfNode from "./nodes/IfNode.jsx";
import OutputNode from "./nodes/OutputNode.jsx";
import TextNode from "./nodes/TextNode.jsx";

import "./text-updater-node.css";
import StartNode from "./nodes/StartNode.jsx";
import TrueNode from "./nodes/TrueNode.jsx";
import { NodesContext } from "./context/NodesContext.jsx";
import Output from "./components/Output.jsx";
import FalseNode from "./nodes/FalseNode.jsx";
import LoopNode from "./nodes/LoopNode.jsx";

const rfStyle = {
  backgroundColor: "#000814",
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
  Start: StartNode,
  TrueNode: TrueNode,
  FalseNode: FalseNode,
  Loop: LoopNode,
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
    { node: <StartNode list={true} />, type: "Start" },
    { node: <IfNode list={true} />, type: "If" },
    { node: <TextNode list={true} />, type: "text" },
    { node: <OutputNode list={true} />, type: "Output" },
    { node: <TrueNode list={true} />, type: "TrueNode" },
    { node: <FalseNode list={true} />, type: "FalseNode" },
    { node: <LoopNode list={true} />, type: "Loop" },
  ]);



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

      setNodes((nds) => nds.concat(type=="text"?newTextNode:newNode));
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
            <div className="w-[200px] border-r border-[#fff3] bg-[#0c0f18]">
              <h1 className="text-white text-2xl p-3">Nodes</h1>

              <div className="flex flex-col items-start">
                {nodesArray.map((n, key) => {
                  return (
                    <div
                      key={key}
                      draggable
                      onDragStart={(event) => onDragStart(event, n.type)}
                      className="m-1"
                    >
                      {n.node}
                    </div>
                  );
                })}
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
