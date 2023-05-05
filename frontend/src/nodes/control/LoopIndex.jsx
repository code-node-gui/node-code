import { Handle, Position } from 'reactflow';

function LoopIndex({ data, isConnectable ,list,selected}) {

  return (
    <div className={` ${selected&&"border-blue-400 "} hover:scale-[1.025] duration-150  p-1 shadow-lg rounded-md px-4 flex bg-[#fffe] backdrop-blur-sm  border`}>

        <label htmlFor="condition" className=' text-[#333] flex items-center gap-1'>
          loop index 
        </label>

        {
            !list&&
            <>
            <Handle className=' border-none rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
            </>
        }
    </div>
  );
}

export default LoopIndex;