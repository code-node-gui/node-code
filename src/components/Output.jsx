import React, { Fragment, useContext, useEffect, useState } from "react";
import { NodesContext } from "../context/NodesContext";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

var Console = [];
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

  const getNode = (node, sourceHandle) => {
    let a = edges.filter(
      (edge) =>
        edge?.source == nodes[node]?.id && edge?.sourceHandle == sourceHandle
    )[0]?.target;
    return nodes.findIndex((n) => n.id == a);
  };

  const fireFunction = (name) => {
    let a = nodes.findIndex(node=>node?.data?.value==name&&node.type=="CreateFun")
    compiling(getNode(a,"value"))
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
        setResultDisplay((p) => [...p, compiling(getNode(node, "value"))]);
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
      } else if (nodes[node]?.type == "And") {
        console.log(
          compiling(getNode(node, "first")) &&
            compiling(getNode(node, "second"))
        );
        return (
          (compiling(getNode(node, "first")) || false) &&
          (compiling(getNode(node, "second")) || false)
        );
      } else if (nodes[node]?.type == "Or") {
        console.log(
          compiling(getNode(node, "first")) ||
            compiling(getNode(node, "second"))
        );
        return (
          compiling(getNode(node, "first")) ||
          false ||
          compiling(getNode(node, "second")) ||
          false
        );
      } else if (nodes[node]?.type == "Not") {
        return !compiling(getNode(node, "first"));
      } else if (nodes[node]?.type == "CreateVar") {
        // variables.push({
        //   name: nodes[node].data.value,
        //   value: compiling(getNode(node, "value")),
        // });
        window[nodes[node].data.value] = compiling(getNode(node, "value"));
        compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "GetVar") {
        // return variables.filter((v) => v.name == nodes[node].data.value)[0]
        //   ?.value;
        return window[nodes[node].data.value];
      } else if (nodes[node]?.type == "SetVar") {
        // variables[
        //   variables.findIndex((v) => v.name == nodes[node].data.value)
        // ].value = compiling(getNode(node, "value"));
        window[nodes[node].data.value] = compiling(getNode(node, "value"));
        compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "Ask") {
        return prompt(nodes[node].data.value);
      } else if (nodes[node]?.type == "Button") {
        return (
          <Fragment key={Math.random()}>
            <button
              id={compiling(getNode(node, "name"))}
              style={{...compiling(getNode(node, "style"))}}
              key={Math.random()}
              onClick={() => compiling(getNode(node, "click"))}
            >
              {String(compiling(getNode(node, "value")))}
            </button>{" "}
            {compiling(getNode(node, "next"))}
          </Fragment>
        );
      } else if (nodes[node]?.type == "DivElm") {
        let divType = compiling(getNode(node, "type"));
        let divStyle = compiling(getNode(node, "style"));
        return (
          <Fragment key={Math.random()}>
            <div
              style={{...compiling(getNode(node, "style"))}}
             >
              {compiling(getNode(node, "value"))}
            </div>
            {compiling(getNode(node, "next"))}
          </Fragment>
        );
      } else if (nodes[node]?.type == "SetText") {
        window.document.getElementById(nodes[node]?.data?.value).textContent =
          compiling(getNode(node, "text"));
        compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "Input") {
        return (
          <Fragment key={Math.random()}>
            <input
              id={compiling(getNode(node, "name"))}
              style={{...compiling(getNode(node, "style"))}}
              key={Math.random()}
              onChange={() => compiling(getNode(node, "change"))}
              value={compiling(getNode(node, "value"))}
            />{" "}
            {compiling(getNode(node, "next"))}
          </Fragment>
        );
      } else if (nodes[node]?.type == "SetValue") {
        window.document.getElementById(nodes[node]?.data?.value).value =
          compiling(getNode(node, "value"));
        compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "SetStyle") {
        let a = compiling(getNode(node, "value"))
        let keys = Object.keys(a);  
        keys.forEach(p=>{
          window.document.getElementById(nodes[node]?.data?.value).style[p]=a[p]
        })
        compiling(getNode(node, "next"));
      } else if (nodes[node]?.type == "GetValue") {
        return window.document.getElementById(nodes[node]?.data?.value).value;
      } else if (nodes[node]?.type == "Text") {
        return (
          <Fragment key={Math.random()}>
            <p
              id={compiling(getNode(node, "name"))}
              style={{...compiling(getNode(node, "style"))}}
            >
              {String(compiling(getNode(node, "text")))}
            </p>{" "}
            {compiling(getNode(node, "next"))}
          </Fragment>
        );
      } else if (nodes[node]?.type == "CreateFun") {
          compiling(getNode(node, "value"))
      } else if (nodes[node]?.type == "FireFun") {
          fireFunction(nodes[node]?.data?.value)
      } else if (nodes[node]?.type == "Style") {
          compiling(getNode(node, "value"))
      } else if (nodes[node]?.type == "GetStyle") {
          return {...getStyle(nodes[node]?.data?.value),...compiling(getNode(node,"next"))}
      } else if (nodes[node]?.type == "Background") {
          return { backgroundColor:compiling(getNode(node, "value")) , ...compiling(getNode(node,"next"))}
      } else if (nodes[node]?.type == "Color") {
          return { color:compiling(getNode(node, "value")) , ...compiling(getNode(node,"next"))}
      } else if (nodes[node]?.type == "FontSize") {
          return { fontSize:compiling(getNode(node, "value")) , ...compiling(getNode(node,"next"))}
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
          {resultDisplay.length > 0 && resultDisplay}
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
