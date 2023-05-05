import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';


function LoopNode({ data, isConnectable,list ,selected }) {

  return (
    <div className={` hover:scale-[1.025] duration-150 w-32 flex flex-col p-2 shadow-lg rounded-md bg-[#fffe] backdrop-blur-sm border `}>
        {!list&& <Handle className=' border rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} /> }
        <label htmlFor="condition" className='text-sm text-[#333] flex items-center gap-1'>Loop <LoopRoundedIcon sx={{fontSize:16}}/></label>
{
  !list&&
  <>
        <label htmlFor="text" className='text-end text-sm   text-[#333] '>times</label>
        <label htmlFor="text" className='text-end text-sm   text-[#333] '>do</label>
        <Handle  className='top-[40px] rounded-full ' type="source" position={Position.Right} id="times" isConnectable={isConnectable} />
        <Handle className='top-[60px]' type="source" position={Position.Right} id="do" isConnectable={isConnectable} />
        <Handle  type="source" position={Position.Bottom} id="next" isConnectable={isConnectable} />
  </>
}

    </div>
  );
}

export default LoopNode;
