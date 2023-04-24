import React, { useContext, useEffect, useState } from "react";
import { NodesContext } from "../context/NodesContext";

function Output() {
  const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);
  const [result, setResult] = useState([]);
  const getStart = () => {
    return nodes.findIndex((e) => e.id == "start");
  };

  const play = () => {
    setResult([]);
    compiling(getStart());
  };

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

  const compiling = (node) => {
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
        setResult((p) => [...p, compiling(getNode(node, "value"))]);
        compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "text") {
        return nodes[node].data.value;
      } else {
        compiling(null);
      }
    }
  };

  return (
    <div>
      <button onClick={play} className="border rounded-sm p-2 bg-green-500">
        Start
      </button>
      <h1 className="mt-8 text-white text-xl px-3">Console</h1>
      <div className="py-2">
        {result.map((line, key) => {
          return (
            <p key={key} className="text-green-500 px-3 ">
              {">> " + line}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Output;
