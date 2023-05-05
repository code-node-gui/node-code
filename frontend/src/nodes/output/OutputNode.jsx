import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
const handleStyle = { top: 10 };

function OutputNode({ data, isConnectable , list}) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="  hover:scale-[1.025] duration-150 flex flex-col p-2 shadow-lg rounded-md bg-[#fffe] backdrop-blur-sm border ">
      {

            !list&&
        <Handle className=' rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
      }
        <label htmlFor="condition" className='text-sm text-[#333] flex items-center gap-1'>output <ForwardRoundedIcon sx={{fontSize:16}}/></label>
        {
            !list&&
            <>
        <Handle className='' type="source" position={Position.Right} id="value" isConnectable={isConnectable} />
        <Handle className='' type="source" position={Position.Bottom} id="next" isConnectable={isConnectable} />
            </>
        }
    </div>
  );
}

export default OutputNode;
