
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { NodesContext } from '../../context/NodesContext';

function GetVar({ data , isConnectable ,list}) {
    const [selected, setSelected ]=useState("")
    const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);
    const [options, setOptions ]=useState([])


  useEffect(()=>{
      setSelected(data?.selected||"")
  },[])



    useMemo(()=>{
      let getOpt=[]
      nodes.forEach(node => {
          if(node.type=="CreateVar"){
            getOpt.push(node?.data?.value)
          }
      });
      setOptions(getOpt)
    },[nodes])





    const run = (id)=> setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== id) {
            return node;
          }

          return {
            ...node,
            data: {
              ...node.data,
              selected,
            },
          };
        })
      );



    useEffect(() => {
      run(data?.id)
    }, [selected])
    

  return (
    <div className="  hover:scale-[1.025] duration-150  p-2 shadow-lg rounded-md flex bg-[#fffe] backdrop-blur-sm border ">
        {
            !list&&
        <Handle className=' rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
        }
        <label className='text-[#333] pr-2'>get</label>

    <select
      value={selected}
      onChange={e => setSelected(e.target.value)} // ... and update the state variable on any change!
      className='bg-gray-200 outline-none p-1 ml-1 rounded-md'
      style={{width:selected.length+3+"ch"}}
    >
      {options.map((option,key)=>{
        return (
            <option key={key} value={option}>{option}</option>
        )
      })}
    </select>
    </div>
  );
}
export default GetVar;