import { useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { NodesContext } from '../../context/NodesContext';

function LoopIndex({ data, isConnectable ,list,selected}) {

    const [text, setText ]=useState('')
    const { nodes, setNodes, edges ,setEdges, onNodesChange } = useContext(NodesContext);


    useEffect(()=>{
      setText(data?.value)
    },[])

    const run = (v,id)=> setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== id) {
            return node;
          }

          const value = v;


          return {
            ...node,
            expandParent:true,
            data: {
              ...node.data,
              value,
            },
          };
        })
      );



    useEffect(() => {
      run(text,data?.id)
    }, [text])
    

  return (
    <div className={` ${selected&&"border-blue-400 "} hover:scale-[1.025] duration-150  p-1 shadow-lg rounded-md px-4 flex bg-[#fffe] backdrop-blur-sm  border`}>
        <label htmlFor="condition" className=' text-[#333] pr-2 flex items-center gap-1'>
          loop index 
        </label>
        {
            !list&&
            <>
            <Handle className=' border-none rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
            </>
        }
        <input style={{width:2+text?.length+"ch"}} value={text} onChange={(e)=>setText(e.target.value)} className=' min-w-[30px] rounded-sm bg-[#eee] px-2 outline-none   text-[#333] '/>
    </div>
  );
}

export default LoopIndex;