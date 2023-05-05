import { Handle, Position } from 'reactflow';

function DivNode({ data, isConnectable ,list}) {

  return (
    <div className="  hover:scale-[1.025] duration-150  p-1 shadow-lg rounded-md px-4 flex bg-[#fffe] backdrop-blur-sm border ">

        <label htmlFor="condition" className='text-xl text-[#333] flex items-center gap-1'>
          /
        </label>

        {
            !list&&
            <>
            <Handle className=' border-none rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
            <Handle className=' border-none rounded-lg ' type="source" id="first" position={Position.Top} isConnectable={isConnectable} />
            <Handle className=' border-none rounded-lg  ' type="source" id="second" position={Position.Bottom} isConnectable={isConnectable} />
            </>
        }
    </div>
  );
}

export default DivNode;