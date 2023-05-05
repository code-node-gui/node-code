import { Handle, Position } from 'reactflow';
const handleStyle = { top: 10 };
import { NodesContext } from '../../context/NodesContext';
import { useContext, useEffect, useState } from 'react';

function Color({ data, isConnectable , list}) {


    const [text, setText ]=useState('#eeeeee')
    const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);

    useEffect(()=>{
      setText(data?.value)
    },[])

    const run = (v,id)=> setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== id) {
            return node;
          }

          const value = v;


          return {
            ...node,
            data: {
              ...node.data,
              value,
            },
          };
        })
      );



    useEffect(() => {
      run(text,data?.id)
    }, [text])
    


  return (
    <div className=" flex-row hover:scale-[1.025] duration-150 flex p-2 shadow-lg rounded-md bg-[#fffe] backdrop-blur-sm border ">
        <label htmlFor="condition" className='text-sm text-[#333] flex items-center gap-1'>color</label>
        <input value={text} onChange={(e)=>setText(e.target.value)} type='color' className='ml-2 w-12'></input>
        {
            !list&&
            <>
        <Handle className='rounded-full w-4' type="target" position={Position.Top} id="target" isConnectable={isConnectable} />
        <Handle className='rounded-full' type="source" position={Position.Right} id="value" isConnectable={isConnectable} />
        <Handle className='rounded-full' type="source" position={Position.Bottom} id="next" isConnectable={isConnectable} />
            </>
        }
    </div>
  );
}

export default Color;
