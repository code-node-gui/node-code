
import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { NodesContext } from '../../context/NodesContext';

function GetItem({ data , isConnectable ,list}) {
    const [text, setText ]=useState('')
    const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);

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
    <div className="  hover:scale-[1.025] duration-150  p-2 shadow-lg rounded-md flex bg-[#fffe] backdrop-blur-sm border ">
        {
            !list&&
            <>
        <Handle className=' rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
        <Handle className=' rounded-lg ' type="source" id="index" position={Position.Right} isConnectable={isConnectable} />
            </>
        }
        <label className='text-[#333] pr-2'>from</label>
        <input style={{width:2+text?.length+"ch"}} value={text} onChange={(e)=>setText(e.target.value)} className=' min-w-[30px] rounded-full bg-[#eee] px-2 outline-none   text-[#333] '/>
        <label className='text-[#333] pl-2'>index</label>
    </div>
  );
}
export default GetItem;