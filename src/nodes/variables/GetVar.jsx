
import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';

function GetVar({ data , isConnectable ,list}) {
    const [text, setText ]=useState('')

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
        <p className='text-[#333] pr-2'>get</p>
        <input style={{width:2+text.length+"ch"}} value={text} onChange={(e)=>setText(e.target.value)} className=' min-w-[30px] rounded-full bg-[#eee] px-2 outline-none   text-[#333] '/>
    </div>
  );
}
export default GetVar;