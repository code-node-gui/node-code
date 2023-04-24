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
    strokeWidth: ".5px",
  },
};

const connectionLineStyle = { stroke: "white" };

const initialNodes = [
  {
    id: "start",
    type: "Start",
    position: { x: 10, y: 10 },
  }
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  Output: OutputNode,
  If: IfNode,
  text: TextNode,
  Start: StartNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

function Flow() {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);

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
        x: event.clientX - reactFlowBounds.left-200,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id:type=="Start"?"start":getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen">
      <ReactFlowProvider>
        <div className="flex-1 h-full w-full flex" ref={reactFlowWrapper}>




          <div className="w-[200px] border-r border-[#fff3] bg-[#171b26]">
            <h1 className="text-white text-2xl p-3">Nodes</h1>

            <aside>
              <div
                className="p-2 bg-[#fff1] border border-[#fff3] text-white m-1 rounded-md"
                onDragStart={(event) => onDragStart(event, "Start")}
                draggable
              >
                start
              </div>
              <div
                className="p-2 bg-[#fff1] border border-[#fff3] text-white m-1 rounded-md"
                onDragStart={(event) => onDragStart(event, "If")}
                draggable
              >
                if
              </div>
              <div
                className="p-2 bg-[#fff1] border border-[#fff3] text-white m-1 rounded-md"
                onDragStart={(event) => onDragStart(event, "Output")}
                draggable
              >
                output
              </div>
              <div
                className="p-2 bg-[#fff1] border border-[#fff3] text-white m-1 rounded-md"
                onDragStart={(event) => onDragStart(event, "text")}
                draggable
              >
                text
              </div>
            </aside>
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
              <Background color="#222" variant={"dots"} />
            </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default Flow;
