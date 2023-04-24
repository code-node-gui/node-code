import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';


function LoopNode({ data, isConnectable,list }) {

  return (
    <div className=" hover:scale-[1.025] duration-150 w-32 flex flex-col p-2 shadow-lg rounded-md bg-[#00356650] backdrop-blur-sm border border-[#fff5]">
        {!list&& <Handle className='bg-[#ffc300] border-[#ffc300] rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} /> }
        <label htmlFor="condition" className='text-sm text-[#ffc300] flex items-center gap-1'>Loop <LoopRoundedIcon sx={{fontSize:16}}/></label>
        <label htmlFor="text" className='text-end text-sm text-white'>times</label>
        <label htmlFor="text" className='text-end text-sm text-white'>do</label>
{
  !list&&
  <>
        <Handle  className='top-[40px] rounded-full ' type="source" position={Position.Right} id="times" isConnectable={isConnectable} />
        <Handle className='top-[60px]' type="source" position={Position.Right} id="do" isConnectable={isConnectable} />
        <Handle  type="source" position={Position.Bottom} id="next" isConnectable={isConnectable} />
  </>
}

    </div>
  );
}

export default LoopNode;
