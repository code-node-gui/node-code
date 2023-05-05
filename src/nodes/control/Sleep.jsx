
import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import { NodesContext } from '../../context/NodesContext';

function Sleep({ data ,id , isConnectable ,list,selected}) {
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
    <div className={`  hover:scale-[1.025] duration-150  p-1 shadow-lg rounded-md px-4 flex bg-[#fffe] backdrop-blur-sm border border`}>
        {
            !list&&
            <>
        <Handle className='rounded-lg h-4' type="target" id="source" position={Position.Left} isConnectable={isConnectable} />
        <Handle className='rounded-lg h-4' type="source" id="next" position={Position.Right} isConnectable={isConnectable} />
            </>
        }
        <p className='text-[#333] pr-2'>sleep for </p>
        <input type='number' style={{width:2+text?.length+"ch"}} value={text} onChange={(e)=>setText(e.target.value)} className=' min-w-[30px] rounded-sm bg-[#eee] px-2 outline-none   text-[#333] '/>
        <p className='text-[#333] pl-2'>s</p>
    </div>
  );
}

export default Sleep;