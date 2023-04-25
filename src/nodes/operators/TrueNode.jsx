import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

function FalseNode({ data, isConnectable ,list}) {

  return (
    <div className="  hover:scale-[1.025] duration-150  p-2 shadow-lg rounded-full px-4 flex bg-[#fffe] backdrop-blur-sm border border">

        <label htmlFor="condition" className='text-sm text-[#333] flex items-center gap-1'>
            true 
        </label>

        {
            !list&&
        <Handle className=' border-none rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
        }
    </div>
  );
}

export default FalseNode;