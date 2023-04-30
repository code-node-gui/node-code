import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { cats } from "./assets/cats.js";
import Ask from "./nodes/input/Ask.jsx";
import Display from "./nodes/output/Display.jsx";
import Button from "./nodes/Elements/Button.jsx";
import DivElm from "./nodes/Elements/Div.jsx";
import Screen from "./nodes/output/Screen.jsx";
import And from "./nodes/operators/And.jsx";
import Or from "./nodes/operators/Or.jsx";
import Not from "./nodes/operators/Not.jsx";
import SetText from "./nodes/control/SetText.jsx";
import Input from "./nodes/Elements/Input.jsx";
import SetValue from "./nodes/control/SetValue.jsx";
import GetValue from "./nodes/control/GetValue.jsx";
import Text from "./nodes/Elements/Text.jsx";
import CreateFun from "./nodes/functions/CreateFun.jsx";
import FireFun from "./nodes/functions/FireFun.jsx";
import Style from "./nodes/Style/Style.jsx";
import GetStyle from "./nodes/Style/GetStyle.jsx";
import BackgroundC from "./nodes/Style/Background.jsx"
import Color from "./nodes/Style/Color.jsx";
import FontSize from "./nodes/Style/Fontsize.jsx";
import SetStyle from "./nodes/control/SetStyle.jsx";

const rfStyle = {
  backgroundColor: "#f0f0f0",
};

function componentDidMount() {
  // document.addEventListener('contextmenu', (e) => {
  //   e.preventDefault();
  // });
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
    stroke: "#333",
    strokeWidth: "1px",
  },
  type: 'smoothstep',
};

const connectionLineStyle = { stroke: "#555", className:"animated"  };

const initialNodes = [
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  Output: OutputNode,
  Display,

  If: IfNode,

  text: TextNode,
  number: NumberNode,
  Ask: Ask,

  Start: StartNode,
  TrueNode: TrueNode,
  FalseNode: FalseNode,
  Loop: LoopNode,
  Equal: EqualNode,
  Bigger: BiggerNode,
  Smaller: SmallerNode,
  SetText,
  SetValue,
  GetValue,
  SetStyle,

  Add: AddNode,
  Sub: SubNode,
  Mul: MulNode,
  Div: DivNode,

  CreateVar,
  GetVar,
  SetVar,

  And,Or,Not,

  Button,
  DivElm,
  Screen,
  Input,
  Text,

  CreateFun,
  FireFun,

  Style,
  GetStyle,
  Background:BackgroundC,
  Color,
  FontSize,
};

let id = Math.random();
const getId = () => `node_${id++}`;

function Flow() {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [display, setDisplay] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);

 

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





  const [nodesArray, setNodeArray] = useState([
    { node: <StartNode list={true} />, type: "Start",cat:"control" },
    { node: <IfNode list={true} />, type: "If",cat:"control" },
    { node: <LoopNode list={true} />, type: "Loop" ,cat:"control"},
    { node: <SetText list={true} />, type: "SetText" ,cat:"control"},
    { node: <SetValue list={true} />, type: "SetValue" ,cat:"control"},
    { node: <SetStyle list={true} />, type: "SetStyle" ,cat:"control"},
    { node: <GetValue list={true} />, type: "GetValue" ,cat:"control"},

    { node: <TextNode list={true} />, type: "text",cat:"input" },
    { node: <NumberNode list={true} />, type: "number",cat:"input" },
    // { node: <Ask list={true} />, type: "Ask",cat:"input" },

    { node: <OutputNode list={true} />, type: "Output",cat:"output" },
    { node: <Display list={true} />, type: "Display",cat:"output" },
    // { node: <Screen list={true} />, type: "Screen",cat:"output" },

    { node: <TrueNode list={true} />, type: "TrueNode",cat:"operators" },
    { node: <FalseNode list={true} />, type: "FalseNode",cat:"operators" },
    { node: <EqualNode list={true} />, type: "Equal" , cat:"operators"},
    { node: <BiggerNode list={true} />, type: "Bigger", cat:"operators" },
    { node: <SmallerNode list={true} />, type: "Smaller", cat:"operators" },
    { node: <And list={true} />, type: "And", cat:"operators" },
    { node: <Or list={true} />, type: "Or", cat:"operators" },
    { node: <Not list={true} />, type: "Not", cat:"operators" },

    { node: <AddNode list={true} />, type: "Add", cat:"math" },
    { node: <SubNode list={true} />, type: "Sub", cat:"math" },
    { node: <MulNode list={true} />, type: "Mul", cat:"math" },
    { node: <DivNode list={true} />, type: "Div", cat:"math" },


    { node: <CreateVar list={true} />, type: "CreateVar",cat:"variables" },
    { node: <SetVar list={true} />, type: "SetVar",cat:"variables" },
    { node: <GetVar list={true} />, type: "GetVar",cat:"variables" },

    { node: <CreateFun list={true} />, type: "CreateFun",cat:"functions" },
    { node: <FireFun list={true} />, type: "FireFun",cat:"functions" },


    { node: <Button list={true} />, type: "Button",cat:"elements" },
    { node: <DivElm list={true} />, type: "DivElm",cat:"elements" },
    { node: <Input list={true} />, type: "Input",cat:"elements" },
    { node: <Text list={true} />, type: "Text",cat:"elements" },


    { node: <Style list={true} />, type: "Style",cat:"style" },
    { node: <GetStyle list={true} />, type: "GetStyle",cat:"style" },
    { node: <BackgroundC list={true} />, type: "Background",cat:"style" },
    { node: <Color list={true} />, type: "Color",cat:"style" },
    { node: <FontSize list={true} />, type: "FontSize",cat:"style" },
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
        data: { onChange: onChange , text: "" ,id:newNode.id},
      }

      setNodes((nds) => nds.concat(type=="SetStyle"||type=="GetStyle"||type=="Style"|| type=="text"|| type=="Ask" ||type=="number"||type=="CreateVar"||type=="SetVar"||type=="GetVar"||type=="SetText"||type=="SetValue"||type=="GetValue" ||type=="CreateFun"||type=="FireFun" ?newTextNode:newNode));
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <NodesContext.Provider value={{ nodes, setNodes, onNodesChange,edges, setEdges, onEdgesChange,display,setDisplay }}>
      <div className="flex flex-col w-screen h-screen">
        <ReactFlowProvider >
          <div className="flex-1 h-full w-full flex" ref={reactFlowWrapper}>

            <div className="w-[250px] border-r border-[#fff3] bg-[#fff] flex flex-col">
              <h1 className="text-gray-700 text-2xl p-3">Nodes</h1>

              <div className="flex flex-col items-start justify-start px-3 overflow-y-auto flex-1">
                {
                  cats.map((cat,key1)=>{
                    return(
                      <div key={key1} className="flex flex-col items-start">
                      <h3 className="text-gray-700 my-1 mt-4">{cat.name}</h3>
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
              <MiniMap zoomable pannable className="bg-gray-400" />
              <Background color="#ddd" variant={"lines"} />
            </ReactFlow>
            <div className="w-[400px] bg-[#fff]">
                <Output/>
            </div>
          </div>
        </ReactFlowProvider>
      </div>
    </NodesContext.Provider>
  );
}

export default Flow;
