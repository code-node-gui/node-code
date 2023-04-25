import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import HelpIcon from '@mui/icons-material/Help';

const handleStyle = { top: 10 };

function IfNode({ data, isConnectable,list }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className=" hover:scale-[1.025] duration-150 w-32 flex flex-col p-2 shadow-lg rounded-md bg-[#00356650] backdrop-blur-sm border border-[#fff5]">
        {!list&& <Handle className='bg-[#ffc300] border-[#ffc300] rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} /> }
        <label htmlFor="condition" className='text-sm text-[#ffc300] flex items-center gap-1'>if <HelpIcon sx={{fontSize:16}}/></label>
        <label htmlFor="text" className='text-end text-sm text-white mb-4'>condition</label>
        <label htmlFor="text" className='text-end text-sm text-white'>do</label>
        <label htmlFor="text" className='text-end text-sm text-white'>else</label>
{
  !list&&
  <>
        <Handle  className='top-[40px] rounded-full h-3' type="source" position={Position.Right} id="condition" isConnectable={isConnectable} />
        <Handle className='top-[75px]' type="source" position={Position.Right} id="do" isConnectable={isConnectable} />
        <Handle className='top-[95px]' type="source" position={Position.Right} id="else" isConnectable={isConnectable} />
        <Handle  type="source" position={Position.Bottom} id="next" isConnectable={isConnectable} />
  </>
}

    </div>
  );
}

export default IfNode;
