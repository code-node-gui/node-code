import { Handle, Position } from 'reactflow';
const handleStyle = { top: 10 };
import { NodesContext } from '../../context/NodesContext';

function FontSize({ data, isConnectable , list}) {



  return (
    <div className=" flex-row hover:scale-[1.025] duration-150 flex p-2 shadow-lg rounded-md bg-[#fffe] backdrop-blur-sm border ">
        <label htmlFor="condition" className='text-sm text-[#333] flex items-center gap-1'>font size</label>
        {
            !list&&
            <>
        <Handle className='rounded-full w-4' type="target" position={Position.Top} id="target" isConnectable={isConnectable} />
        <Handle className='rounded-full' type="source" position={Position.Right} id="value" isConnectable={isConnectable} />
        <Handle className='rounded-full' type="source" position={Position.Bottom} id="next" isConnectable={isConnectable} />
            </>
        }
    </div>
  );
}

export default FontSize;
