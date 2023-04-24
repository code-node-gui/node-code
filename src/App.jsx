import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  SelectionMode,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

import TextUpdaterNode from "./TextUpdaterNode.jsx";
import IfNode from "./nodes/IfNode.jsx";
import OutputNode from "./nodes/OutputNode.jsx";
import TextNode from "./nodes/TextNode.jsx";

import "./text-updater-node.css";

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
  animated: true,
  style: {
    stroke: "white",
  },
};

const connectionLineStyle = { stroke: "white" };

const initialNodes = [
  {
    id: "A",
    type: "If",
    position: { x: 10, y: 10 },
  },
  {
    id: "B",
    type: "Output",
    position: { x: 10, y: 90 },
  },
  {
    id: "c",
    type: "text",
    position: { x: 10, y: 90 },
  },
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { Output: OutputNode, If: IfNode, text:TextNode};

const initialEdges = [{ id: "e2-3", source: "2", target: "1", animated: true }];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="flex w-screen h-screen">
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            connectionLineStyle={connectionLineStyle}
            defaultEdgeOptions={edgeOptions}
            style={rfStyle}
          >
            <Controls className="bg-white" />
            <MiniMap zoomable pannable className="bg-gray-900" />
            <Background color="#222" variant={"dots"} />
          </ReactFlow>
        </div>
        <div className="w-[300px] border-l" style={rfStyle}></div>
    </div>
  );
}

export default Flow;
