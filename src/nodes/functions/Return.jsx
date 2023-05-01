import { Handle, Position } from 'reactflow';

function Return({ data, isConnectable ,list}) {

  return (
    <div className="  hover:scale-[1.025] duration-150  p-1 shadow-lg rounded-md px-4 flex bg-[#fffe] backdrop-blur-sm border border">

        <label htmlFor="condition" className=' text-[#333] flex items-center gap-1'>
          return
        </label>

        {
            !list&&
            <>
            <Handle className=' border-none rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
            <Handle className=' border-none rounded-lg ' type="source" id="value" position={Position.Right} isConnectable={isConnectable} />
            </>
        }
    </div>
  );
}

export default Return;