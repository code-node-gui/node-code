import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
const handleStyle = { top: 10 };
import StyleIcon from '@mui/icons-material/Style';
import { NodesContext } from '../../context/NodesContext';

function Style({ data, isConnectable , list}) {



    const [text, setText ]=useState('')
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
    <div className="rounded-l-full flex-row hover:scale-[1.025] duration-150 flex p-2 shadow-lg rounded-md bg-[#fffe] backdrop-blur-sm border ">
        <label htmlFor="condition" className='text-sm text-[#333] flex items-center gap-1'>styling <StyleIcon sx={{fontSize:16}}/></label>
        {
            !list&&
            <>
        <Handle className='' type="source" position={Position.Bottom} id="value" isConnectable={isConnectable} />
        <input style={{width:2+text?.length+"ch"}} value={text} onChange={(e)=>setText(e.target.value)} className=' ml-2 min-w-[30px] rounded-sm bg-[#eee] px-2 outline-none   text-[#333] '/>
            </>
        }
    </div>
  );
}

export default Style;
