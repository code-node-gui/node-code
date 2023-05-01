
import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import { NodesContext } from '../../context/NodesContext';

function AddToArray({ data , isConnectable ,list}) {
    const [array, setArray ]=useState('')
    const [value, setValue ]=useState('')
    const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);

    useEffect(()=>{
      setArray(data?.array)
      setValue(data?.value)
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
              array,
              value,
            },
          };
        })
      );



    useEffect(() => {
      run(data?.id)
    }, [value,array])
    
    

  return (
    <div className="  hover:scale-[1.025] duration-150  p-2 shadow-lg rounded-md flex bg-[#fffe] backdrop-blur-sm border ">
        {
            !list&&
            <>
        <Handle className=' rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
        <Handle className=' rounded-lg h-4' type="source" id="value" position={Position.Right} isConnectable={isConnectable} />
        <Handle className=' rounded-lg ' type="source" id="next" position={Position.Bottom} isConnectable={isConnectable} />
            </>
        }
        <p className='text-[#333] px-2'>add to</p>
        <input style={{width:2+array?.length+"ch"}} value={array} onChange={(e)=>setArray(e.target.value)} className=' min-w-[30px] rounded-full bg-[#eee] px-2 outline-none   text-[#333] '/>
        <p className='text-[#333] px-2'>=</p>
        <input style={{width:2+value?.length+"ch"}} value={value} onChange={(e)=>setValue(e.target.value)} className=' min-w-[30px] rounded-full bg-[#eee] px-2 outline-none   text-[#333] '/>
    </div>
  );
}

export default AddToArray;