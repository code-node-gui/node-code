import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

function EqualNode({ data, isConnectable ,list}) {

  return (
    <div className="  hover:scale-[1.025] duration-150  p-1 shadow-lg rounded-md px-4 flex bg-[#00356650] backdrop-blur-sm border border-green-400">

        <label htmlFor="condition" className='text-xl text-green-400 flex items-center gap-1'>
            = 
        </label>

        {
            !list&&
            <>
            <Handle className='bg-green-300 border-none rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
            <Handle className='bg-green-300 border-none rounded-lg ' type="source" id="first" position={Position.Top} isConnectable={isConnectable} />
            <Handle className='bg-green-300 border-none rounded-lg ' type="source" id="second" position={Position.Bottom} isConnectable={isConnectable} />
            </>
        }
    </div>
  );
}

export default EqualNode;