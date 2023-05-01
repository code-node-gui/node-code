import React, { Fragment, useContext, useEffect, useState } from "react";
import { NodesContext } from "../context/NodesContext";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { backdropClasses } from "@mui/material";

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

  // useEffect(() => {
  //   setStart(false);
  // }, [nodes]);

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

  const getStyle = (name, loopVar, fun) => {
    let a = nodes.findIndex(
      (node) => node?.data?.value == name && node.type == "Style"
    );
    return { ...compiling(getNode(a, "value"), loopVar, fun) };
  };

  const getParamValue = (value, fun) => {
    let a = nodes.findIndex(
      (node) =>
        node?.data?.value == fun?.fnName &&
        node.type == "FireFun" &&
        node.id == fun.id
    );
    return compiling(getNode(a, "params"), null, fun)[value];
  };

  var variables = [];
  const compiling = (node, loopVar, fun) => {
    if (nodes[node]?.type == "Start") {
      setResult([]);
      variables = [];
    }
    if (node != null) {
      if (nodes[node]?.type == "If") {
        if (compiling(getNode(node, "condition"), loopVar, fun)) {
          compiling(getNode(node, "do"), loopVar, fun);
        } else {
          compiling(getNode(node, "else"), loopVar, fun);
        }
        compiling(getNode(node, "next"), loopVar, fun);
      } else if (nodes[node]?.type == "TrueNode") {
        return true;
      } else if (nodes[node]?.type == "FalseNode") {
        return false;
      } else if (nodes[node]?.type == "Start") {
        compiling(getNode(node, "start"), loopVar, fun);
        compiling(getNode(node, "next"), loopVar, fun);
      } else if (nodes[node]?.type == "Output") {
        Console.push(compiling(getNode(node, "value"), loopVar, fun));
        setResultUp((p) => p + 1);
        compiling(getNode(node, "next"), loopVar, fun);
      } else if (nodes[node]?.type == "Display") {
        setResultDisplay((p) => [
          ...p,
          compiling(getNode(node, "value"), loopVar, fun),
        ]);
        setResultUp((p) => p + 1);
        compiling(getNode(node, "next"), loopVar, fun);
      } else if (nodes[node]?.type == "text") {
        return nodes[node].data.value;
      } else if (nodes[node]?.type == "number") {
        return Number(nodes[node].data.value);
      } else if (nodes[node]?.type == "Loop") {
        for (
          let index = 0;
          index < compiling(getNode(node, "times"), loopVar, fun);
          index++
        ) {
          compiling(getNode(node, "do"), index, fun);
        }
      } else if (nodes[node]?.type == "Equal") {
        return (
          compiling(getNode(node, "first"), loopVar, fun) ===
          compiling(getNode(node, "second"), loopVar, fun)
        );
      } else if (nodes[node]?.type == "Bigger") {
        return (
          compiling(getNode(node, "first"), loopVar, fun) <
          compiling(getNode(node, "second"), loopVar, fun)
        );
      } else if (nodes[node]?.type == "Smaller") {
        return (
          compiling(getNode(node, "first"), loopVar, fun) >
          compiling(getNode(node, "second"), loopVar, fun)
        );
      } else if (nodes[node]?.type == "Add") {
        return (
          compiling(getNode(node, "first"), loopVar, fun) +
          compiling(getNode(node, "second"), loopVar, fun)
        );
      } else if (nodes[node]?.type == "Sub") {
        return (
          compiling(getNode(node, "first"), loopVar, fun) -
          compiling(getNode(node, "second"), loopVar, fun)
        );
      } else if (nodes[node]?.type == "Mul") {
        return (
          compiling(getNode(node, "first"), loopVar, fun) *
          compiling(getNode(node, "second"), loopVar, fun)
        );
      } else if (nodes[node]?.type == "Div") {
        return (
          compiling(getNode(node, "first"), loopVar, fun) /
          compiling(getNode(node, "second"), loopVar, fun)
        );
      } else if (nodes[node]?.type == "And") {
        console.log(
          compiling(getNode(node, "first"), loopVar, fun) &&
            compiling(getNode(node, "second"), loopVar, fun)
        );
        return (
          (compiling(getNode(node, "first"), loopVar, fun) || false) &&
          (compiling(getNode(node, "second"), loopVar, fun) || false)
        );
      } else if (nodes[node]?.type == "Or") {
        console.log(
          compiling(getNode(node, "first"), loopVar, fun) ||
            compiling(getNode(node, "second"), loopVar, fun)
        );
        return (
          compiling(getNode(node, "first"), loopVar, fun) ||
          false ||
          compiling(getNode(node, "second"), loopVar, fun) ||
          false
        );
      } else if (nodes[node]?.type == "Not") {
        return !compiling(getNode(node, "first"), loopVar, fun);
      } else if (nodes[node]?.type == "CreateVar") {
        window[nodes[node].data.value] = compiling(
          getNode(node, "value"),
          loopVar,
          fun
        );
        compiling(getNode(node, "next"), loopVar, fun);
      } else if (nodes[node]?.type == "GetVar") {
        return window[nodes[node].data.value];
      } else if (nodes[node]?.type == "SetVar") {
        window[nodes[node].data.value] = compiling(
          getNode(node, "value"),
          loopVar,
          fun
        );
        compiling(getNode(node, "next"), loopVar, fun);
      } else if (nodes[node]?.type == "Ask") {
        return prompt(nodes[node].data.value);
      } else if (nodes[node]?.type == "Button") {
        let a = String(compiling(getNode(node, "value"), loopVar, fun));
        return (
          <Fragment key={Math.random()}>
            <button
              id={compiling(getNode(node, "name"), loopVar, fun)}
              style={{ ...compiling(getNode(node, "style"), loopVar, fun) }}
              key={Math.random()}
              onClick={() => compiling(getNode(node, "click"), loopVar, fun)}
            >
              {a}
            </button>{" "}
            {compiling(getNode(node, "next"), loopVar, fun)}
          </Fragment>
        );
      } else if (nodes[node]?.type == "DivElm") {
        let divType = compiling(getNode(node, "type"), loopVar, fun);
        let divStyle = compiling(getNode(node, "style"), loopVar, fun);
        return (
          <Fragment key={Math.random()}>
            <div style={{ ...compiling(getNode(node, "style"), loopVar, fun) }}>
              {compiling(getNode(node, "value"), loopVar, fun)}
            </div>
            {compiling(getNode(node, "next"), loopVar, fun)}
          </Fragment>
        );
      } else if (nodes[node]?.type == "SetText") {
        window.document.getElementById(nodes[node]?.data?.value).textContent =
          compiling(getNode(node, "text"), loopVar, fun);
        compiling(getNode(node, "next"), loopVar, fun);
      } else if (nodes[node]?.type == "Input") {
        return (
          <Fragment key={Math.random()}>
            <input
              id={compiling(getNode(node, "name"), loopVar, fun)}
              style={{ ...compiling(getNode(node, "style"), loopVar, fun) }}
              key={Math.random()}
              onChange={() => compiling(getNode(node, "change"), loopVar, fun)}
              value={compiling(getNode(node, "value"), loopVar, fun)}
            />{" "}
            {compiling(getNode(node, "next"), loopVar, fun)}
          </Fragment>
        );
      } else if (nodes[node]?.type == "SetValue") {
        window.document.getElementById(nodes[node]?.data?.value).value =
          compiling(getNode(node, "value"), loopVar, fun);
        compiling(getNode(node, "next"), loopVar, fun);
      } else if (nodes[node]?.type == "SetStyle") {
        let a = compiling(getNode(node, "value"), loopVar, fun);
        let keys = Object.keys(a);
        keys.forEach((p) => {
          window.document.getElementById(nodes[node]?.data?.value).style[p] =
            a[p];
        });
        compiling(getNode(node, "next"), loopVar, fun);
      } else if (nodes[node]?.type == "GetValue") {
        return window.document.getElementById(nodes[node]?.data?.value).value;
      } else if (nodes[node]?.type == "Text") {
        return (
          <Fragment key={Math.random()}>
            <p
              id={compiling(getNode(node, "name"), loopVar, fun)}
              style={{ ...compiling(getNode(node, "style"), loopVar, fun) }}
            >
              {String(compiling(getNode(node, "text"), loopVar, fun))}
            </p>{" "}
            {compiling(getNode(node, "next"), loopVar, fun)}
          </Fragment>
        );
      } else if (nodes[node]?.type == "CreateFun") {
        compiling(getNode(node, "value"), loopVar, fun);
      } else if (nodes[node]?.type == "FireFun") {
          fireFunction(nodes[node]?.data?.value)
          compiling(getNode(node, "next"),loopVar)
      } else if (nodes[node]?.type == "Style") {
        compiling(getNode(node, "value"), loopVar, fun);
      } else if (nodes[node]?.type == "GetStyle") {
        return {
          ...getStyle(nodes[node]?.data?.value, loopVar, fun),
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "Background") {
        return {
          backgroundColor: compiling(getNode(node, "value"), loopVar, fun),
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "Color") {
        return {
          color: compiling(getNode(node, "value"), loopVar, fun),
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "FontSize") {
        return {
          fontSize: compiling(getNode(node, "value"), loopVar, fun),
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "WidthVal") {
        return {
          width: compiling(getNode(node, "value"), loopVar, fun),
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "HightVal") {
        return {
          height: compiling(getNode(node, "value"), loopVar, fun),
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "DisplayCss") {
        return {
          display: compiling(getNode(node, "value") , loopVar, fun)|| nodes[node]?.data?.value,
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "FlexDir") {
        return {
          flexDirection: compiling(getNode(node, "value") , loopVar, fun)|| nodes[node]?.data.value,
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "CreateArray") {
        let a = [...compiling(getNode(node, "value"), loopVar, fun)].flat(
          Infinity
        );
        return a;
      } else if (nodes[node]?.type == "ArrayItem") {
        let a = [nodes[node]?.data?.value];
        let b = compiling(getNode(node, "next", loopVar, fun));
        if (b) {
          return [a, b];
        } else {
          return [b];
        }
      } else if (nodes[node]?.type == "SetParam") {
        return {
          [nodes[node]?.data?.value]: compiling(
            getNode(node, "value", loopVar, fun)
          ),
          ...compiling(getNode(node, "next", loopVar, fun)),
        };
      } else if (nodes[node]?.type == "GetParam") {
        return getParamValue(nodes[node]?.data?.value, fun);
      } else if (nodes[node]?.type == "GetItem") {
        return window[[nodes[node]?.data?.value]][
          compiling(getNode(node, "index"), loopVar, fun)
        ];
      } else if (nodes[node]?.type == "ChangeVarBy") {
        window[[nodes[node]?.data?.value]] += Number(
          compiling(getNode(node, "value"), loopVar, fun)
        );
        compiling(getNode(node, "next"), loopVar, fun);
      } else if (nodes[node]?.type == "LoopIndex") {
        return loopVar;
      } else if (nodes[node]?.type == "RandomNum") {

        const randomNumber=(b=0, a=1)=> {
          let max = a>b? a:b;
          let min = a<b? a:b;
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return randomNumber(compiling(getNode(node, "second"), loopVar, fun),compiling(getNode(node, "first"), loopVar, fun) ) 

      } else if (nodes[node]?.type == "Return") {
        return (compiling(getNode(node, "value"), loopVar, fun))
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
          {resultDisplay && resultDisplay}
        </div>
      </div>
      <h1 className="mt-8   text-[#333]  text-xl px-3">Console</h1>
      <div style={{}} className="py-2 flex-1  overflow-auto w-full">
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
