import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import HelpIcon from '@mui/icons-material/Help';
import { cats } from '../../assets/cats.js';

function DivElm({ data, isConnectable,list }) {
  return (
    <div className={` hover:scale-[1.025] duration-150 w-32 flex flex-col p-2 shadow-lg rounded-md bg-[#fff] backdrop-blur-sm border `}>
        {!list&& <Handle className={`bg-[#333] rounded-lg h-4`} type="target" id="source" position={Position.Left} isConnectable={isConnectable} /> }
        <label htmlFor="condition" className={`text-sm text-[#333] flex items-center gap-1`}>view </label>
{
  !list&&
  <>
        <label htmlFor="text" className={`text-end text-sm   text-[#333]  mb-4`}>children</label>
        <label htmlFor="text" className={`text-end text-sm   text-[#333]   `}>type</label>
        <label htmlFor="text" className={`text-end text-sm   text-[#333]   `}>style</label>
        <Handle  className='top-[40px] rounded-full h-3' type="source" position={Position.Right} id="value" isConnectable={isConnectable} />
        <Handle className='top-[75px]' type="source" position={Position.Right} id="type" isConnectable={isConnectable} />
        <Handle className='top-[95px]' type="source" position={Position.Right} id="style" isConnectable={isConnectable} />
        <Handle  type="source" position={Position.Bottom} id="next" isConnectable={isConnectable} />
  </>
}

    </div>
  );
}

export default DivElm;
