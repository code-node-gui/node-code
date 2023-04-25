import React, { useContext, useEffect, useState } from "react";
import { NodesContext } from "../context/NodesContext";
 
var Console = [];
function Output() {
  const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);
  const [result, setResult] = useState(["show output here"]);
  const [resultUp, setResultUp] = useState(0);
  const getStart = () => {
    return nodes.findIndex((e) => e.id == "start");
  };

  const play = () => {
        variables=[]
        Console=[]
    compiling(getStart());
  };
  useEffect(()=>{
    setResult(Console)
  },[resultUp])


  const getNode = (node, sourceHandle) => {
    let a = edges.filter(
      (edge) =>
        edge.source == nodes[node].id && edge.sourceHandle == sourceHandle
    )[0]?.target;
    return nodes.findIndex((n) => n.id == a);
  };

  //   const compiling = (node) => {
  //     if (node == null) {
  //       return "";
  //     }
  //     switch (nodes[node]?.type) {
  //       case "If":
  //         return `
  //                 if(${compiling(getNode(node, "condition"))}){
  //                     ${compiling(getNode(node, "do"))}
  //                 }else{
  //                     ${compiling(getNode(node, "else"))}
  //                 }
  //             `;
  //       case "TrueNode":
  //         return "true";
  //       case "Start":
  //         return compiling(getNode(node, "else"));
  //       default:
  //         compiling(null);
  //         break;
  //     }
  //   };

var variables = []
  const compiling = (node) => {
    if(nodes[node]?.type=="Start"){
        setResult([])
        variables=[]
    }
    if (node != null) {
      if (nodes[node]?.type == "If") {
        if (compiling(getNode(node, "condition"))) {
          compiling(getNode(node, "do"));
        } else {
          compiling(getNode(node, "else"));
        }
        compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "TrueNode") {
        return true;
      } else if (nodes[node]?.type == "FalseNode") {
        return false;
      } else if (nodes[node]?.type == "Start") {
        return compiling(getNode(node, "start"));
      } else if (nodes[node]?.type == "Output") {
        Console.push(compiling(getNode(node, "value")))
        setResultUp(p=>p+1)
        compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "text") {
        return nodes[node].data.value;
      } else if (nodes[node]?.type == "number") {
        return Number(nodes[node].data.value);
      } else if (nodes[node]?.type == "Loop") {
        for (let index = 0; index < compiling(getNode(node,"times")) ; index++) {
            compiling(getNode(node,"do"))
        }
      } else if (nodes[node]?.type == "Equal") {
            return (compiling(getNode(node,"first")) === compiling(getNode(node,"second")) )
      } else if (nodes[node]?.type == "Bigger") {
            return (compiling(getNode(node,"first")) < compiling(getNode(node,"second")) )
      } else if (nodes[node]?.type == "Smaller") {
            return (compiling(getNode(node,"first")) > compiling(getNode(node,"second")) )
      } else if (nodes[node]?.type == "Add") {
            return (compiling(getNode(node,"first")) + compiling(getNode(node,"second")) )
      } else if (nodes[node]?.type == "Sub") {
            return (compiling(getNode(node,"first")) - compiling(getNode(node,"second")) )
      } else if (nodes[node]?.type == "Mul") {
            return (compiling(getNode(node,"first")) * compiling(getNode(node,"second")) )
      } else if (nodes[node]?.type == "Div") {
            return (compiling(getNode(node,"first")) / compiling(getNode(node,"second")) )
      } else if (nodes[node]?.type == "CreateVar") {
            variables.push({name:nodes[node].data.value,value:compiling(getNode(node,"value"))})
            compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "GetVar") {
            return variables.filter(v=>v.name==nodes[node].data.value)[0]?.value
      } else if (nodes[node]?.type == "SetVar") {
            variables[variables.findIndex(v=>v.name==nodes[node].data.value)].value=compiling(getNode(node, "value"));
            compiling(getNode(node, "next"));
      } else {
        compiling(null);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen items-start">
      <button onClick={play} className="border p-2 bg-[#eee] rounded-full px-4 m-2">
        Start
      </button>
      <h1 className="mt-8   text-[#333]  text-xl px-3">Console</h1>
      <div className="py-2 flex-1  overflow-auto">
        {result.map((line, key) => {
          return (
            <div key={key} className="text-gray-600 px-3 break-all">
              {">> " + line}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Output;
