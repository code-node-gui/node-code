import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
const handleStyle = { top: 10 };

function OutputNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className=" flex flex-col p-2 shadow-lg rounded-md bg-[#00356650] backdrop-blur-sm border border-[#fff5]">
        <Handle className='bg-[#3a86ff] border-[#3a86ff] rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
        <label htmlFor="condition" className='text-sm text-[#3a86ff] flex items-center gap-1'>output <ForwardRoundedIcon sx={{fontSize:16}}/></label>
        <Handle className='' type="source" position={Position.Right} id="else" isConnectable={isConnectable} />
    </div>
  );
}

export default OutputNode;
