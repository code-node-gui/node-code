import React, { Fragment, useContext, useEffect, useState } from "react";
import { NodesContext } from "../context/NodesContext";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Button, backdropClasses } from "@mui/material";
import { StopRounded } from "@mui/icons-material";
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';

var Console = [];
function Output({screen}) {
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
  }, [nodes,edges, start]);

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

  const fireFunction = (name,fireId) => {
    let a = nodes.findIndex(node=>node?.data?.value==name&&node.type=="CreateFun")
    return compiling(getNode(a,"value"),null,{fnName:name,id:nodes[a]?.id,fireId})
  };

  const getStyle = (name, loopVar, fun) => {
    let a = nodes.findIndex(
      (node) => node?.data?.value == name && node.type == "Style"
    );
    return { ...compiling(getNode(a, "value"), loopVar, fun) };
  };

  const getParamValue = (value, fun) => {
    console.log(value)
    let a = nodes.findIndex(
      (node) =>
        (
        node?.data?.selected == fun?.fnName 
        &&
        node.type == "FireFun" 
        &&
        node.id == fun.fireId
        )
    );
    let b =compiling(getNode(a, "params"), null, fun) 
    console.log(b)
    return b[value]
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
      } else if (nodes[node]?.type == "ReturningIf") {
        return compiling(getNode(node, "condition"),loopVar,fun) ? compiling(getNode(node, "do"), loopVar, fun) : compiling(getNode(node, "else"), loopVar, fun)
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
          compiling(getNode(node, "do"), {...loopVar,[nodes[node].data.value]:index}, fun);
        }
      } else if (nodes[node]?.type == "ReturningLoop") {
        // for (
        //   let index = 0;
        //   index < compiling(getNode(node, "times"), loopVar, fun);
        //   index++
        // ) {
        //   compiling(getNode(node, "do"), index, fun);
        // }
        let a = new Array(compiling(getNode(node,"times"),loopVar,fun)).fill("nothing")
        let b = a.map((item,key)=>{
          return compiling(getNode(node, "do"), key, fun);
        })
        return b

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
        window[nodes[node]?.data?.text] = (compiling(
          getNode(node, "value"),
          loopVar,
          fun
        )|| nodes[node]?.data?.value);
        compiling(getNode(node, "next"), loopVar, fun);
      } else if (nodes[node]?.type == "GetVar") {
        return window[nodes[node]?.data?.selected];
      } else if (nodes[node]?.type == "SetVar") {
        window[nodes[node].data.selected] = compiling(
          getNode(node, "value"),
          loopVar,
          fun
        )||nodes[node].data?.value;
        compiling(getNode(node, "next"), loopVar, fun);
      } else if (nodes[node]?.type == "Ask") {
        return prompt(nodes[node].data.value);
      } else if (nodes[node]?.type == "Button") {
        let a = compiling(getNode(node, "value"), loopVar, fun)||nodes[node].data?.text;
        return (
          <Fragment key={Math.random()}>
            <Button
              id={compiling(getNode(node, "name"), loopVar, fun)||nodes[node].data?.name}
              style={{ ...compiling(getNode(node, "style"), loopVar, fun) }}
              key={Math.random()}
              onClick={() => compiling(getNode(node, "click"), loopVar, fun)}
            >
              {a}
            </Button>{" "}
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
        return window.document.getElementById(nodes[node]?.data?.value)?.value;
      } else if (nodes[node]?.type == "Text") {
        return (
          <Fragment key={Math.random()}>
            <p
              id={compiling(getNode(node, "name"), loopVar, fun)}
              style={{ ...compiling(getNode(node, "style"), loopVar, fun) }}
            >
              {compiling(getNode(node, "text"), loopVar, fun)}
            </p>{" "}
            {compiling(getNode(node, "next"), loopVar, fun)}
          </Fragment>
        );
      } else if (nodes[node]?.type == "CreateFun") {
        compiling(getNode(node, "value"), loopVar, fun);
      } else if (nodes[node]?.type == "FireFun") {
          try {
            return fireFunction(nodes[node]?.data?.selected,nodes[node]?.id)
          }finally{
            compiling(getNode(node, "next"),loopVar)
          }
      } else if (nodes[node]?.type == "Style") {
        compiling(getNode(node, "value"), loopVar, fun);
      } else if (nodes[node]?.type == "GetStyle") {
        return {
          ...getStyle(nodes[node]?.data?.value, loopVar, fun),
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "Background") {
        return {
          backgroundColor: compiling(getNode(node, "value") , loopVar, fun) || nodes[node]?.data.value,
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "Color") {
        return {
          color: compiling(getNode(node, "value") , loopVar, fun) || nodes[node]?.data.value,
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "FontSize") {
        return {
          fontSize: compiling(getNode(node, "value") , loopVar, fun) || nodes[node]?.data.value,
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "WidthVal") {
        return {
          width: compiling(getNode(node, "value") , loopVar, fun) || nodes[node]?.data.value,
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "HightVal") {
        return {
          height: compiling(getNode(node, "value") , loopVar, fun) || nodes[node]?.data.value,
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
      } else if (nodes[node]?.type == "Flex") {
        return {
          flex: compiling(getNode(node, "value") , loopVar, fun) || nodes[node]?.data.value,
          ...compiling(getNode(node, "next"), loopVar, fun),
        };
      } else if (nodes[node]?.type == "CreateArray") {
        let a = [Array.isArray(compiling(getNode(node, "value"), loopVar, fun))?[...compiling(getNode(node, "value"), loopVar, fun)]:[]].flat(
          Infinity
        );
        return a;
      } else if (nodes[node]?.type == "ArrayItem") {
        let a = [compiling(getNode(node, "value", loopVar, fun)) ||nodes[node]?.data?.value];
        let b = compiling(getNode(node, "next", loopVar, fun));
        if (b) {
          return [a, b];
        } else {
          return [a];
        }
      } else if (nodes[node]?.type == "AddToArray") {
        window[nodes[node]?.data.array].push( compiling(getNode(node, "value"), loopVar, fun) || nodes[node]?.data.value)
        compiling(getNode(node, "next"), loopVar, fun)
      } else if (nodes[node]?.type == "SetParam") {
        return {
          [ nodes[node]?.data?.value ]: compiling(
            getNode(node, "value", loopVar, fun)
          )||nodes[node]?.data?.value2,
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
        return loopVar[nodes[node].data.value];
      } else if (nodes[node]?.type == "RandomNum") {

        const randomNumber=(b=0, a=1)=> {
          let max = a>b? a:b;
          let min = a<b? a:b;
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return randomNumber(compiling(getNode(node, "second"), loopVar, fun),compiling(getNode(node, "first"), loopVar, fun) ) 

      } else if (nodes[node]?.type == "Return") {
        return (compiling(getNode(node, "value"), loopVar, fun))

      } else if (nodes[node]?.type == "Sleep"){
        async function b () {
            const a =await setTimeout(() => {
                compiling(getNode(node, "next"), loopVar, fun)
            }, 1000*Number(nodes[node].data.value));
            return a 
        }
        return b()
      } else {
        compiling(null);
      }
    }
  };
  return (
    <div className={"flex flex-col  overflow-y-scroll h-full px-2  items-start duration-300 transition-all "+(screen==1?"w-full":"w-[400px] ") } >
      
      <button
        onClick={() => {
          setStart((s) => !s);
        }}
        className={"border flex items-center gap-1 duration-150 p-2 w-28 justify-center text-white rounded-full px-4 my-2" + (!start?" bg-blue-400 ":" bg-red-400")}
      >
        {!start ? 
        <>start<PlayArrowRoundedIcon /></>
        :
        <>stop<StopRounded /></>
         }
        
        
      </button>
      <div className={"flex h-full overflow-hidden flex-1 w-full "+(screen==1?"flex-row pb-4":"flex-col")}>

      <div id="displayRoot" className={"rounded-md bg-gray-200 border  overflow-y-scroll  resize max-w-none  vertical p-0 "+(screen==1?" both":" h-[80%] ")}>
          {start ? 
          resultDisplay 
          :
          <div onClick={()=>setStart(p=>!p)} className="flex-1 duration-150 justify-center items-center text-blue-400 cursor-pointer hover:bg-gray-100 ">
           <PlayCircleFilledWhiteRoundedIcon sx={{fontSize:"80px"}}/>
          </div>
           
           }
      </div>
      <div className={"w-fit min-w-[200px] min-h-24"+(screen==1&&" flex-1")}>

      <h1 className="mt-4   text-[#333]  text-xl px-3">Output</h1>
      <div style={{}} className="py-2   overflow-auto w-full">
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

      </div>
    </div>
  );
}

export default Output;
