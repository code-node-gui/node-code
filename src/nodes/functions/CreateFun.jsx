import { useCallback, useContext, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { NodesContext } from "../../context/NodesContext";
import CodeIcon from "@mui/icons-material/Code";



import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';




function CreateFun({ data, isConnectable, list, id ,selected }) {
  const [text, setText] = useState("");
  const { nodes, setNodes, edges, setEdges, onNodesChange } =
    useContext(NodesContext);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setText(data?.value);
  }, []);


  useEffect(()=>{
    if (!list) {
        setEdges((p) =>
          p?.map((n) => {
            if (n.source == id) {
              if(selected){
                return { ...n, animated:true };
              }
              else{
                return { ...n, animated:false };
              }
            } else {
              return { ...n  };
            }
          })
        );
    }
  },[selected])




  const run = (v, id) =>
    setNodes((nds) =>
      nds?.map((node) => {
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

  useEffect(() => {
    run(text, data?.id);
  }, [text]);

  const showNodes = (iid) => {
    let a = nodes.find((node) => node.id == iid);
    let eds = edges.filter((edge) => edge.source == a.id);
    let edsIds = edges.filter((edge) => edge.source == a.id).map(e=>e.id)
    if (eds.length > 0) {
      setEdges((e) =>
        e?.map((n) => {
          if (edsIds.includes(n.id)) {
            return { ...n, hidden: !show };
          } else {
            return n;
          }
        })
      );
      eds?.forEach((edge) => {
        let b = nodes.find((node) => node.id == edge.target);
        setNodes((p) =>
          p?.map((n) => {
            if (n.id == b.id) {
              return { ...n, hidden: !show };
            } else {
              return n;
            }
          })
        );
        showNodes(b.id);
      });
    }
  };

  useEffect(() => {
    if (!list) {
      showNodes(id);
    }
  }, [show]);

  return (
    <div className={(selected&&"border-blue-400")+" rounded-l-full   hover:scale-[1.025] duration-150  p-2 shadow-lg rounded-md flex bg-[#fffe] backdrop-blur-sm border "}>
      {!list && (
        <>
          <Handle
            className="  rounded-lg "
            type="source"
            id="value"
            position={Position.Right}
            isConnectable={isConnectable}
          />
        </>
      )}
      <button
        onClick={() => setShow((p) => !p)}
        className="px-2 bg-gray-300 rounded-full mr-2"
      >
        {!show ? <RemoveRedEyeIcon/> : <VisibilityOffIcon/>}
      </button>
      <label className="text-[#333] pr-2">
        function <CodeIcon />
      </label>

      <input
        style={{
          width: 2 + text?.length + "ch",
          background: text?.includes(" ") ? "#fdd" : "#eee",
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className=" min-w-[30px] rounded-full bg-[#eee] px-2 outline-none   text-[#333] "
      />
    </div>
  );
}

export default CreateFun;
