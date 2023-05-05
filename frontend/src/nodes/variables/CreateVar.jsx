
import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import { NodesContext } from '../../context/NodesContext';
const handleStyle = { top: 10 };

function CreateVar({ data , isConnectable ,list}) {
    const [text, setText ]=useState('')
    const [value, setValue ]=useState('')
    const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);

    useEffect(()=>{
      setText(data?.text)
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
              text,
              value,
            },
          };
        })
      );



    useEffect(() => {
      run(data?.id)
    }, [value,text])
    

  return (
    <div className="  hover:scale-[1.025] duration-150  p-2 shadow-lg rounded-md flex bg-[#fffe] backdrop-blur-sm border ">
        {
            !list&&
            <>
        <Handle className='  rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
        <Handle className='  rounded-lg ' type="source" id="value" position={Position.Right} isConnectable={isConnectable} />
        <Handle className='  rounded-lg ' type="source" id="next" position={Position.Bottom} isConnectable={isConnectable} />
            </>
        }
        <label className='text-[#333] pr-2'>create</label>
        <input style={{width:2+text?.length+"ch",background:text?.includes(" ")?"#fdd":"#eee"}} value={text} onChange={(e)=>setText(e.target.value)} className=' min-w-[30px] rounded-full bg-[#eee] px-2 outline-none   text-[#333] '/>
        <label className='text-[#333] px-2'>=</label>
        <input style={{width:2+value?.length+"ch"}} value={value} onChange={(e)=>setValue(e.target.value)} className=' min-w-[30px] rounded-full bg-[#eee] px-2 outline-none   text-[#333] '/>
    </div>
  );
}

export default CreateVar;