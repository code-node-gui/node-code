import React, { Fragment, useContext, useEffect, useState } from "react";
import { NodesContext } from "../context/NodesContext";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { backdropClasses } from "@mui/material";

var Console = [];
var Display = [];
function Output() {
  const { nodes, setNodes, edges, onNodesChange, display, setDisplay } =
    useContext(NodesContext);
  const [result, setResult] = useState(["show output here"]);
  const [resultDisplay, setResultDisplay] = useState([]);
  const [resultUp, setResultUp] = useState(0);
  const [start, setStart] = useState(false);
  const getStart = () => {
    return nodes.findIndex((e) => e.id == "start");
  };

  useEffect(() => {
    setDisplay(resultDisplay);
  }, [resultDisplay]);

  useEffect(() => {
    if (start) {
      variables = [];
      Console = [];
      setResult(Console);
      setResultDisplay("");
      compiling(getStart());
    }
  }, [nodes, start]);

  useEffect(() => {
    if (start) {
      setResult(Console);
    } else {
      variables = [];
      setResultDisplay("");
      Console = [];
      setResult([]);
    }
  }, [resultUp, start]);

  useEffect(() => {
    setStart(false)
  }, [ nodes]);
  

  const getNode = (node, sourceHandle) => {
    let a = edges.filter(
      (edge) =>
        edge?.source == nodes[node]?.id && edge?.sourceHandle == sourceHandle
    )[0]?.target;
    return nodes.findIndex((n) => n.id == a);
  };

  const fireFunction = (name) => {
    let a = nodes.findIndex(node=>node?.data?.value==name&&node.type=="CreateFun")
    return compiling(getNode(a,"value"))
  };

  const getStyle = (name) => {
    let a = nodes.findIndex(node=>node?.data?.value==name&&node.type=="Style")
    return {...compiling(getNode(a,"value"))}
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
  const compiling = (node,loopVar) => {
    if (nodes[node]?.type == "Start") {
      setResult([]);
      variables = [];
    }
    if (node != null) {
      if (nodes[node]?.type == "If") {
        if (compiling(getNode(node, "condition"),loopVar)) {
          compiling(getNode(node, "do"),loopVar);
        } else {
          compiling(getNode(node, "else"),loopVar);
        }
        compiling(getNode(node, "next"),loopVar);
      } else if (nodes[node]?.type == "TrueNode") {
        return true;
      } else if (nodes[node]?.type == "FalseNode") {
        return false;
      } else if (nodes[node]?.type == "Start") {
        compiling(getNode(node, "start"),loopVar);
        compiling(getNode(node, "next"),loopVar);
      } else if (nodes[node]?.type == "Output") {
        Console.push(compiling(getNode(node, "value"),loopVar));
        setResultUp((p) => p + 1);
        compiling(getNode(node, "next"),loopVar);
      } else if (nodes[node]?.type == "Display") {
        setResultDisplay((p) => [...p, compiling(getNode(node, "value"),loopVar)]);
        setResultUp((p) => p + 1);
        compiling(getNode(node, "next"),loopVar);
      } else if (nodes[node]?.type == "text") {
        return nodes[node].data.value;
      } else if (nodes[node]?.type == "number") {
        return Number(nodes[node].data.value);
      } else if (nodes[node]?.type == "Loop") {
         for (
          let index = 0;
          index < compiling(getNode(node, "times"),loopVar);
          index++
        ) {
          compiling(getNode(node, "do"),index);
        }
      } else if (nodes[node]?.type == "Equal") {
        return (
          compiling(getNode(node, "first"),loopVar) ===
          compiling(getNode(node, "second"),loopVar)
        );
      } else if (nodes[node]?.type == "Bigger") {
        return (
          compiling(getNode(node, "first"),loopVar) < compiling(getNode(node, "second"),loopVar)
        );
      } else if (nodes[node]?.type == "Smaller") {
        return (
          compiling(getNode(node, "first"),loopVar) > compiling(getNode(node, "second"),loopVar)
        );
      } else if (nodes[node]?.type == "Add") {
        return (
          compiling(getNode(node, "first"),loopVar) + compiling(getNode(node, "second"),loopVar)
        );
      } else if (nodes[node]?.type == "Sub") {
        return (
          compiling(getNode(node, "first"),loopVar) - compiling(getNode(node, "second"),loopVar)
        );
      } else if (nodes[node]?.type == "Mul") {
        return (
          compiling(getNode(node, "first"),loopVar) * compiling(getNode(node, "second"),loopVar)
        );
      } else if (nodes[node]?.type == "Div") {
        return (
          compiling(getNode(node, "first"),loopVar) / compiling(getNode(node, "second"),loopVar)
        );
      } else if (nodes[node]?.type == "And") {
        console.log(
          compiling(getNode(node, "first"),loopVar) &&
            compiling(getNode(node, "second"),loopVar)
        );
        return (
          (compiling(getNode(node, "first"),loopVar) || false) &&
          (compiling(getNode(node, "second"),loopVar) || false)
        );
      } else if (nodes[node]?.type == "Or") {
        console.log(
          compiling(getNode(node, "first"),loopVar) ||
            compiling(getNode(node, "second"),loopVar)
        );
        return (
          compiling(getNode(node, "first"),loopVar) ||
          false ||
          compiling(getNode(node, "second"),loopVar) ||
          false
        );
      } else if (nodes[node]?.type == "Not") {
        return !compiling(getNode(node, "first"),loopVar);
      } else if (nodes[node]?.type == "CreateVar") {
        // variables.push({
        //   name: nodes[node].data.value,
        //   value: compiling(getNode(node, "value")),
        // });
        window[nodes[node].data.value] = compiling(getNode(node, "value"),loopVar);
        compiling(getNode(node, "next"),loopVar);
      } else if (nodes[node]?.type == "GetVar") {
        // return variables.filter((v) => v.name == nodes[node].data.value)[0]
        //   ?.value;
        return window[nodes[node].data.value];
      } else if (nodes[node]?.type == "SetVar") {
        // variables[
        //   variables.findIndex((v) => v.name == nodes[node].data.value)
        // ].value = compiling(getNode(node, "value"));
        window[nodes[node].data.value] = compiling(getNode(node, "value"),loopVar);
        compiling(getNode(node, "next"),loopVar);
      } else if (nodes[node]?.type == "Ask") {
        return prompt(nodes[node].data.value);
      } else if (nodes[node]?.type == "Button") {
        let a = String(compiling(getNode(node, "value"),loopVar))
        return (
          <Fragment key={Math.random()}>
            <button
              id={compiling(getNode(node, "name"),loopVar)}
              style={{...compiling(getNode(node, "style"),loopVar)}}
              key={Math.random()}
              onClick={() => compiling(getNode(node, "click"),loopVar)}
            >
              {a}
            </button>{" "}
            {compiling(getNode(node, "next"),loopVar)}
          </Fragment>
        );
      } else if (nodes[node]?.type == "DivElm") {
        let divType = compiling(getNode(node, "type"),loopVar);
        let divStyle = compiling(getNode(node, "style"),loopVar);
        return (
          <Fragment key={Math.random()}>
            <div
              style={{...compiling(getNode(node, "style"),loopVar)}}
             >
              {compiling(getNode(node, "value"),loopVar)}
            </div>
            {compiling(getNode(node, "next"),loopVar)}
          </Fragment>
        );
      } else if (nodes[node]?.type == "SetText") {
        window.document.getElementById(nodes[node]?.data?.value).textContent =
          compiling(getNode(node, "text"),loopVar);
        compiling(getNode(node, "next"),loopVar);
      } else if (nodes[node]?.type == "Input") {
        return (
          <Fragment key={Math.random()}>
            <input
              id={compiling(getNode(node, "name"),loopVar)}
              style={{...compiling(getNode(node, "style"),loopVar)}}
              key={Math.random()}
              onChange={() => compiling(getNode(node, "change"),loopVar)}
              value={compiling(getNode(node, "value"),loopVar)}
            />{" "}
            {compiling(getNode(node, "next"),loopVar)}
          </Fragment>
        );
      } else if (nodes[node]?.type == "SetValue") {
        window.document.getElementById(nodes[node]?.data?.value).value =
          compiling(getNode(node, "value"),loopVar);
        compiling(getNode(node, "next"),loopVar);
      } else if (nodes[node]?.type == "SetStyle") {
        let a = compiling(getNode(node, "value"),loopVar)
        let keys = Object.keys(a);  
        keys.forEach(p=>{
          window.document.getElementById(nodes[node]?.data?.value).style[p]=a[p]
        })
        compiling(getNode(node, "next"),loopVar);
      } else if (nodes[node]?.type == "GetValue") {
        return window.document.getElementById(nodes[node]?.data?.value).value;
      } else if (nodes[node]?.type == "Text") {
        return (
          <Fragment key={Math.random()}>
            <p
              id={compiling(getNode(node, "name"),loopVar)}
              style={{...compiling(getNode(node, "style"),loopVar)}}
            >
              {String(compiling(getNode(node, "text"),loopVar))}
            </p>{" "}
            {compiling(getNode(node, "next"),loopVar)}
          </Fragment>
        );
      } else if (nodes[node]?.type == "CreateFun") {
          compiling(getNode(node, "value"),loopVar)
      } else if (nodes[node]?.type == "FireFun") {
          compiling(getNode(node, "next"),loopVar)
          return fireFunction(nodes[node]?.data?.value)
      } else if (nodes[node]?.type == "Style") {
          compiling(getNode(node, "value"),loopVar)
      } else if (nodes[node]?.type == "GetStyle") {
          return {...getStyle(nodes[node]?.data?.value),...compiling(getNode(node,"next"),loopVar)}
      } else if (nodes[node]?.type == "Background") {
          return { backgroundColor:compiling(getNode(node, "value"),loopVar) , ...compiling(getNode(node,"next"),loopVar)}
      } else if (nodes[node]?.type == "Color") {
          return { color:compiling(getNode(node, "value"),loopVar) , ...compiling(getNode(node,"next"),loopVar)}
      } else if (nodes[node]?.type == "FontSize") {
          return { fontSize:compiling(getNode(node, "value"),loopVar) , ...compiling(getNode(node,"next"),loopVar)}
      } else if (nodes[node]?.type == "CreateArray") {
          let a = [...compiling(getNode(node, "value"),loopVar)].flat(Infinity)
          return a
      } else if (nodes[node]?.type == "ArrayItem") {
          let a =  [nodes[node]?.data?.value] 
          let b = compiling(getNode(node, "next",loopVar))
          if(b){
            return [a,b]
          }else{
            return a
          }
          
      } else if (nodes[node]?.type == "GetItem") {
          return window[[nodes[node]?.data?.value]][compiling(getNode(node, "index"),loopVar)]
      } else if (nodes[node]?.type == "ChangeVarBy") {
          window[[nodes[node]?.data?.value]]+=Number(compiling(getNode(node, "value"),loopVar))
          compiling(getNode(node, "next"),loopVar)
      } else if (nodes[node]?.type == "LoopIndex") {
        return loopVar;
      } else {
        compiling(null);
      }
    }
  };
  return (
    <div className="flex flex-col h-screen items-start">
      <button
        onClick={() => {
          setStart((s) => !s);
        }}
        className="border flex items-center gap-1 duration-150 hover:px-5 hover:gap-2 p-2 bg-[#eee] rounded-full px-4 m-2"
      >
        {start ? "stop" : "start"}
        <PlayArrowRoundedIcon />
      </button>
      <h1 id="out" className="mt-8   text-[#333]  text-xl px-3">
        Output
      </h1>
      <div className="py-2 flex-1  overflow-auto w-full">
        <div className="text-gray-600 px-3 break-all" id="displayRoot">
          {
            resultDisplay &&
            resultDisplay
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
