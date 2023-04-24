import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { top: 10 };

function IfNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="w-32 flex flex-col p-2 shadow-lg rounded-md bg-[#00356650] backdrop-blur-sm border border-[#ffc300]">
    <Handle type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
        <label htmlFor="condition" className='text-sm text-[#ffc300]'>if</label>
        <label htmlFor="text" className='text-end text-sm text-white'>condition</label>
        <label htmlFor="text" className='text-end text-sm text-white'>do</label>
        <label htmlFor="text" className='text-end text-sm text-white'>else</label>
        <Handle  className='top-[40px]' type="source" position={Position.Right} id="condition" isConnectable={isConnectable} />
        <Handle className='top-[60px]' type="source" position={Position.Right} id="do" isConnectable={isConnectable} />
        <Handle className='top-[80px]' type="source" position={Position.Right} id="else" isConnectable={isConnectable} />
    </div>
  );
}

export default IfNode;
