import React, { Fragment, useContext, useEffect, useState } from "react";
import { NodesContext } from "../context/NodesContext";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

import { Prompt } from "prompt-sync";
const prompt = Prompt;

var Console = [];
function Output() {
  const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);
  const [result, setResult] = useState(["show output here"]);
  const [resultDisplay, setResultDisplay] = useState([]);
  const [resultUp, setResultUp] = useState(0);
  const [start,setStart]=useState(false)
  const getStart = () => {
    return nodes.findIndex((e) => e.id == "start");
  };

  useEffect(() => {
    if (start) {
    variables = [];
    setResult(Console);
    setResultDisplay("")
    compiling(getStart());
    }
  }, [nodes,start]);

  useEffect(()=>{
    if (start) {
    setResult(Console)
    }else{
      variables = [];
      setResultDisplay("")
      Console=[]
      setResult([])
    }
  },[resultUp,start])

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

  var variables = [];
  const compiling = (node) => {
    if (nodes[node]?.type == "Start") {
      setResult([]);
      variables = [];
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
        compiling(getNode(node, "start"));
        compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "Output") {
        Console.push(compiling(getNode(node, "value")));
        setResultUp((p) => p + 1);
        compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "Display") {
        setResultDisplay(p=>[...p,compiling(getNode(node, "value"))]);
        setResultUp((p) => p + 1);
        compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "text") {
        return nodes[node].data.value;
      } else if (nodes[node]?.type == "number") {
        return Number(nodes[node].data.value);
      } else if (nodes[node]?.type == "Loop") {
        for (
          let index = 0;
          index < compiling(getNode(node, "times"));
          index++
        ) {
          compiling(getNode(node, "do"));
        }
      } else if (nodes[node]?.type == "Equal") {
        return (
          compiling(getNode(node, "first")) ===
          compiling(getNode(node, "second"))
        );
      } else if (nodes[node]?.type == "Bigger") {
        return (
          compiling(getNode(node, "first")) < compiling(getNode(node, "second"))
        );
      } else if (nodes[node]?.type == "Smaller") {
        return (
          compiling(getNode(node, "first")) > compiling(getNode(node, "second"))
        );
      } else if (nodes[node]?.type == "Add") {
        return (
          compiling(getNode(node, "first")) + compiling(getNode(node, "second"))
        );
      } else if (nodes[node]?.type == "Sub") {
        return (
          compiling(getNode(node, "first")) - compiling(getNode(node, "second"))
        );
      } else if (nodes[node]?.type == "Mul") {
        return (
          compiling(getNode(node, "first")) * compiling(getNode(node, "second"))
        );
      } else if (nodes[node]?.type == "Div") {
        return (
          compiling(getNode(node, "first")) / compiling(getNode(node, "second"))
        );
      } else if (nodes[node]?.type == "CreateVar") {
        variables.push({
          name: nodes[node].data.value,
          value: compiling(getNode(node, "value")),
        });
        compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "GetVar") {
        return variables.filter((v) => v.name == nodes[node].data.value)[0]
          ?.value;
      } else if (nodes[node]?.type == "SetVar") {
        variables[
          variables.findIndex((v) => v.name == nodes[node].data.value)
        ].value = compiling(getNode(node, "value"));
        compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "Ask") {
        prompt(nodes[node].data.value);
      } else if (nodes[node]?.type == "Button") {
        return <button onClick={()=>compiling(getNode(node,'click'))} >{compiling(getNode(node, "value"))}</button>
      } else {
        compiling(null);
      }
    }
  };
  return (
    <div className="flex flex-col h-screen items-start">
      <button
        onClick={()=>setStart(s=>!s)}
        className="border flex items-center gap-1 duration-150 hover:px-5 hover:gap-2 p-2 bg-[#eee] rounded-full px-4 m-2"
      >
        {start?"stop":"start"}
        <PlayArrowRoundedIcon />
      </button>
      <h1 className="mt-8   text-[#333]  text-xl px-3">Output</h1>
      <div className="py-2 flex-1  overflow-auto w-full">
        <div
          className="text-gray-600 px-3 break-all"
          id="displayRoot"
        >
          {
            resultDisplay.length > 0 && 
            resultDisplay?.map((e,key)=><Fragment key={key}> {e} </Fragment>)
          }
        </div>
      </div>
      <h1 className="mt-8   text-[#333]  text-xl px-3">Console</h1>
      <div className="py-2 flex-1  overflow-auto w-full">
        {result.map((line, key) => {
          return (
            <div
              dangerouslySetInnerHTML={{ __html: line }}
              key={key}
              className="text-gray-600 px-3 break-all"
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Output;
