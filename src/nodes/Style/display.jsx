import { Handle, Position } from 'reactflow';
import { NodesContext } from '../../context/NodesContext';
import { useContext, useEffect, useState } from 'react';

function DisplayCss({ data, isConnectable , list}) {


  const [selected, setSelected] = useState('flex'); 
  const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);

    useEffect(()=>{
      setSelected(data?.value)
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
      run(selected,data?.id)
    }, [selected])






  return (
    <div className=" flex-row hover:scale-[1.025] duration-150 flex p-2 shadow-lg rounded-md bg-[#fffe] backdrop-blur-sm border ">
        <label htmlFor="condition" className='text-sm text-[#333] flex items-center gap-1'>display</label>


    <select
      value={selected} // ...force the select's value to match the state variable...
      onChange={e => setSelected(e.target.value)} // ... and update the state variable on any change!
      className='bg-gray-200 outline-none p-1 ml-1 rounded-md'
    >
      <option value="block">block</option>
      <option value="flex">flex</option>
      <option value="relative">relative</option>
      <option value="absolute">absolute</option>
    </select>


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

export default DisplayCss;
