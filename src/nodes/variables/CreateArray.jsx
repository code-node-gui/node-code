import { Handle, Position } from 'reactflow';

function CreateArray({ data, isConnectable ,list}) {

  return (
    <div className="  hover:scale-[1.025] duration-150  p-1 shadow-lg rounded-md px-4 flex bg-[#fffe] backdrop-blur-sm border border">

        <label htmlFor="condition" className=' text-[#333] flex items-center gap-1'>
          array 
        </label>

        {
            !list&&
            <>
              <Handle className=' border-none rounded-lg w-4' type="target" id="source" position={Position.Top} isConnectable={isConnectable} />
              <Handle className=' border-none rounded-lg ' type="source" id="value" position={Position.Bottom} isConnectable={isConnectable} />
            </>
        }
    </div>
  );
}

export default CreateArray;