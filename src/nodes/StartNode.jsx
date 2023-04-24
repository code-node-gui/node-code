import { useCallback} from 'react';
import { Handle, Position } from 'reactflow';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

function StartNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="  p-2 shadow-lg rounded-md flex bg-[#00356650] backdrop-blur-sm border border-[#fff5]">
        <label htmlFor="condition" className='text-sm text-[#3a86ff] flex items-center gap-1'>
            start 
            <PlayArrowRoundedIcon/>
        </label>
        <Handle className='' type="source" position={Position.Right} id="else" isConnectable={isConnectable} />
    </div>
  );
}

export default StartNode;