import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import { NodesContext } from '../../context/NodesContext';


function LoopNode({ data, isConnectable,list ,selected }) {

    const [text, setText ]=useState('')
    const { nodes, setNodes, edges ,setEdges, onNodesChange } = useContext(NodesContext);


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
            expandParent:true,
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
    <div className={`w-fit hover:scale-[1.025] duration-150 w-32 flex flex-col p-2 shadow-lg rounded-md bg-[#fffe] backdrop-blur-sm border `}>
        {!list&& <Handle className=' border rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} /> }
        <label htmlFor="condition" className='text-sm text-[#333] flex items-center gap-1'>Loop <LoopRoundedIcon sx={{fontSize:16}}/></label>
{
  !list&&
  <>
        <label htmlFor="text" className='text-end text-sm   text-[#333] '>times</label>
        <label htmlFor="text" className='text-end text-sm   text-[#333] '>do</label>
        <div className='pl-8 w-fit flex gap-2 justify-end'>
          <label htmlFor="text" className='text-end text-sm   text-[#333] '>name</label>
          <input style={{width:2+text?.length+"ch"}} value={text} onChange={(e)=>setText(e.target.value)} className='rounded-full min-w-[30px]  bg-[#eee] px-2 outline-none   text-[#333] '/>
        </div>
        <Handle  className='top-[40px] rounded-full ' type="source" position={Position.Right} id="times" isConnectable={isConnectable} />
        <Handle className='top-[60px]' type="source" position={Position.Right} id="do" isConnectable={isConnectable} />
        <Handle  type="source" position={Position.Bottom} id="next" isConnectable={isConnectable} />
  </>
}

    </div>
  );
}

export default LoopNode;
