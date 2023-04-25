import { useCallback} from 'react';
import { Handle, Position } from 'reactflow';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

function StartNode({ data, isConnectable ,list}) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="  hover:scale-[1.025] duration-150  p-2 shadow-lg rounded-md flex bg-[#fffe] backdrop-blur-sm border ">
        <label htmlFor="condition" className='text-sm text-[#333] flex items-center gap-1'>
            start 
            <PlayArrowRoundedIcon/>
        </label>
        {
            !list&&
            <>
                <Handle className='' type="source" position={Position.Right} id="start" isConnectable={isConnectable} />
                <Handle className='' type="source" position={Position.Bottom} id="next" isConnectable={isConnectable} />
            </>
        }
    </div>
  );
}

export default StartNode;