import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

function TrueNode({ data, isConnectable ,list}) {

  return (
    <div className="  hover:scale-[1.025] duration-150  p-2 shadow-lg rounded-full px-4 flex bg-[#00356650] backdrop-blur-sm border border-red-400">

        <label htmlFor="condition" className='text-sm text-red-400 flex items-center gap-1'>
            false 
        </label>

        {
            !list&&
        <Handle className='bg-red-300 border-none rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
        }
    </div>
  );
}

export default TrueNode;