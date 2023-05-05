
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import { NodesContext } from '../../context/NodesContext';

function SetVar({ data , isConnectable ,list}) {
    const [selected, setSelected ]=useState("")
    const [value, setValue ]=useState("")
    const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);
    const [options, setOptions ]=useState([])


  useEffect(()=>{
      setSelected(data?.selected||"")
      setValue(data?.value||"")
  },[])



    useMemo(()=>{
      let getOpt=[]
      nodes.forEach(node => {
          if(node.type=="CreateVar"){
            getOpt.push(node?.data?.text)
          }
      });
      setOptions(getOpt)
      if(selected==null||!getOpt.includes(selected)){
        setSelected(getOpt[getOpt.length-1])
      }
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
              value,
            },
          };
        })
      );



    useEffect(() => {
      run(data?.id)
    }, [selected,value])
    

  return (
    <div className="  hover:scale-[1.025] duration-150  p-2 shadow-lg rounded-md flex bg-[#fffe] backdrop-blur-sm border ">
        {
            !list&&
            <>
        <Handle className=' rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
        <Handle className=' rounded-lg ' type="source" id="value" position={Position.Right} isConnectable={isConnectable} />
        <Handle className=' rounded-lg ' type="source" id="next" position={Position.Bottom} isConnectable={isConnectable} />
            </>
        }
        <p className='text-[#333] pr-2'>set</p>
    <select
      value={selected}
      onChange={e => setSelected(e.target.value)} // ... and update the state variable on any change!
      className='bg-gray-200 outline-none p-1 ml-1 rounded-md'
    >
      {options.map((option,key)=>{
        return (
            <option key={key} value={option}>{option}</option>
        )
      })}
    </select>
        <p className='text-[#333] px-2'>to</p>
        <input style={{width:2+value?.length+"ch",background:value?.includes(" ")?"#fdd":"#eee"}} value={value} onChange={(e)=>setValue(e.target.value)} className=' min-w-[30px] rounded-full bg-[#eee] px-2 outline-none   text-[#333] '/>
    </div>
  );
}

export default SetVar;