import { useCallback, useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import HelpIcon from '@mui/icons-material/Help';
import { cats } from '../../assets/cats.js';
import { NodesContext } from '../../context/NodesContext.jsx';

function Button({ data, isConnectable,list,selected }) {
  

    const [text, setText ]=useState('')
    const [name, setName ]=useState('')
    const { nodes, setNodes, edges, onNodesChange } = useContext(NodesContext);


    useEffect(()=>{
      setText(data?.text)
      setName(data?.name)
    },[])

    const run = (id)=> setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== id) {
            return node;
          }

          return {
            ...node,
            data: {
              ...node.data,
              text,
              name,
            },
          };
        })
      );



    useEffect(() => {
      run(data?.id)
    }, [text,name])
    



  return (
    <div className={`${selected&&" border-blue-400"} hover:scale-[1.025] duration-150 w-fit min-w-32 flex flex-col p-2 shadow-lg rounded-md bg-[#fff] backdrop-blur-sm border `}>
        {!list&& <Handle className={`bg-[#333] rounded-lg h-4`} type="target" id="source" position={Position.Left} isConnectable={isConnectable} /> }
        <label htmlFor="condition" className={`text-sm text-[#333] flex items-center gap-1`}>button </label>
{
  !list&&
  <>
  <div className='pl-10 mb-2 flex justify-end mt-2'>
        <label htmlFor="text" className={`text-end text-sm   text-[#333] mx-1  `}>text</label>
        <input style={{width:2+text?.length+"ch"}} value={text} onChange={(e)=>setText(e.target.value)} className=' min-w-[30px] rounded-full bg-[#eee] px-2 outline-none   text-[#333] '/>
  </div>

  <div className='pl-10 mb-2 flex justify-end'>
        <label htmlFor="text" className={`text-end text-sm   text-[#333]   `}>name</label>
        <input style={{width:2+name?.length+"ch"}} value={name} onChange={(e)=>setName(e.target.value)} className=' min-w-[30px] rounded-full bg-[#eee] px-2 outline-none   text-[#333] '/>
  </div>
        <label htmlFor="text" className={`text-end text-sm   text-[#333]  `}>click</label>
        <label htmlFor="text" className={`text-end text-sm   text-[#333]   `}>style</label>
        <Handle  className='top-[48px] rounded-full h-3' type="source" position={Position.Right} id="value" isConnectable={isConnectable} />
        <Handle className='top-[80px]' type="source" position={Position.Right} id="name" isConnectable={isConnectable} />
        <Handle className='top-[110px]' type="source" position={Position.Right} id="click" isConnectable={isConnectable} />
        <Handle className='top-[130px]' type="source" position={Position.Right} id="style" isConnectable={isConnectable} />
        <Handle  type="source" position={Position.Bottom} id="next" isConnectable={isConnectable} />
  </>
}

    </div>
  );
}

export default Button;
