import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import HelpIcon from '@mui/icons-material/Help';
import { cats } from '../../assets/cats.js';
import { NodesContext } from '../../context/NodesContext.jsx';

function ReturningIf({ data,id, isConnectable,list ,selected}) {

    const { nodes, setNodes, edges ,setEdges, onNodesChange } = useContext(NodesContext);

  useEffect(()=>{
    if (!list) {
        setEdges((p) =>
          p?.map((n) => {
            if (n.source == id) {
              if(selected){
                return { ...n, animated:true };
              }
              else{
                return { ...n, animated:false };
              }
            } else {
              return { ...n  };
            }
          })
        );
        }
  },[selected])

  return (
    <div className={`${selected&&" border-blue-400"}  hover:scale-[1.025] duration-150 w-32 flex flex-col p-2 shadow-lg rounded-md bg-[#fff] backdrop-blur-sm border `}>
        {!list&& <Handle className={`bg-[#333] rounded-lg h-4`} type="target" id="source" position={Position.Left} isConnectable={isConnectable} /> }
        <label htmlFor="condition" className={`text-sm text-[#333] flex items-center gap-1`}>return if <HelpIcon sx={{fontSize:16}}/></label>
{
  !list&&
  <>
        <label htmlFor="text" className={`text-end text-sm   text-[#333]  mb-4`}>condition</label>
        <label htmlFor="text" className={`text-end text-sm   text-[#333]  `}>return</label>
        <label htmlFor="text" className={`text-end text-sm   text-[#333]   `}>else</label>
        <Handle  className='top-[40px] rounded-full h-3' type="source" position={Position.Right} id="condition" isConnectable={isConnectable} />
        <Handle className='top-[75px]' type="source" position={Position.Right} id="do" isConnectable={isConnectable} />
        <Handle className='top-[95px]' type="source" position={Position.Right} id="else" isConnectable={isConnectable} />
        <Handle  type="source" position={Position.Bottom} id="next" isConnectable={isConnectable} />
  </>
}

    </div>
  );
}

export default ReturningIf;
