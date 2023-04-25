
import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import { NodesContext } from '../../context/NodesContext';
const handleStyle = { top: 10 };

function NumberNode({ data , isConnectable ,list}) {
    const [text, setText ]=useState('')
    const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);

    useEffect(() => {
      if(!list){
        data.onChange(text,data.id)
      }
    }, [text])
    

  return (
    <div className="  hover:scale-[1.025] duration-150  p-2 shadow-lg rounded-md flex bg-[#fffe] backdrop-blur-sm border ">
        {
            !list&&
        <Handle className=' rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
        }
        <p className='text-[#333] pr-2'>number</p>
        <input style={{width:2+text.length+"ch"}} value={text} type='number' onChange={(e)=>setText(e.target.value)} className=' min-w-[30px] bg-[#eee] rounded-sm bg-[#fff3] px-2 outline-none   text-[#333] '/>
    </div>
  );
}

export default NumberNode;