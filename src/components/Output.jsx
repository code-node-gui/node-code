import React, { useContext, useEffect, useState } from "react";
import { NodesContext } from "../context/NodesContext";

function Output() {
  const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);
  const [result, setResult] = useState("");
  const getStart = () => {
    return nodes.findIndex((e) => e.id == "start");
  };

  useEffect(() => {
    setResult(compiling(getStart()));
  }, [nodes]);

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
      } else if (nodes[node]?.type == "TrueNode") {
        return true;
      } else if (nodes[node]?.type == "FalseNode") {
        return false;
      } else if (nodes[node]?.type == "Start") {
        return compiling(getNode(node, "start"));
      } else {
        compiling(null);
      }
    }
  };

  return <p>{result}</p>;
}

export default Output;
