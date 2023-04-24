
import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
const handleStyle = { top: 10 };

function TextNode({ data, isConnectable }) {
    const [text, setText ]=useState('')
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="  p-2 shadow-lg rounded-md flex bg-[#00356650] backdrop-blur-sm border border-[#fff5]">
        <Handle className='bg-[#3a86ff] border-[#3a86ff] rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
        <input style={{width:2+text.length+"ch"}} value={text} onChange={(e)=>setText(e.target.value)} className=' min-w-[30px] rounded-sm bg-[#fff3] px-2 outline-none text-white'/>
    </div>
  );
}

export default TextNode;