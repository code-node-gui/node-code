
import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { NodesContext } from '../../context/NodesContext';
import CodeIcon from '@mui/icons-material/Code';
function SetParam({ data , isConnectable ,list}) {
    const [value, setValue ]=useState('')
    const [value2, setValue2 ]=useState('')
    const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);

    useEffect(()=>{
      setValue(data?.value)
      setValue2(data?.value2)
    },[])

    const run = (id)=> setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== id) {
            return node;
          }
          return {
            ...node,
            data: {
              ...node.data,
              value, 
              value2, 

            },
          };
        })
      );



    useEffect(() => {
      run(data?.id)
    }, [value])
    
    useEffect(() => {
      run(data?.id)
    }, [value2])
    

  return (
    <div className="  hover:scale-[1.025] duration-150  p-2 shadow-lg rounded-md flex bg-[#fffe] backdrop-blur-sm border ">
        {
            !list&&
            <>
        <Handle className='  rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
        <Handle className='  rounded-lg ' type="source" id="next" position={Position.Bottom} isConnectable={isConnectable} />
        <Handle className='  rounded-lg ' type="source" id="value" position={Position.Right} isConnectable={isConnectable} />
            </>
        }
        <label className='text-[#333] pr-2'>param </label>
        <input style={{width:2+value?.length+"ch",background:value?.includes(" ")?"#fdd":"#eee"}} value={value} onChange={(e)=>setValue(e.target.value)} className=' min-w-[30px] rounded-full bg-[#eee] px-2 outline-none   text-[#333] '/>
        <label className='text-[#333] px-2'>= </label>
        <input style={{width:2+value2?.length+"ch",background:value2?.includes(" ")?"#fdd":"#eee"}} value={value2} onChange={(e)=>setValue2(e.target.value)} className=' min-w-[30px] rounded-full bg-[#eee] px-2 outline-none   text-[#333] '/>
    </div>
  );
}

export default SetParam;