
import { useCallback, useContext } from 'react';
import { Handle, Position } from 'reactflow';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import { NodesContext } from '../../context/NodesContext';
const handleStyle = { top: 10 };

function Screen({ data, isConnectable , list}) {
    const {display } = useContext(NodesContext)
  return (
    <div className={`  ${!list && " w-[40vw] h-fit"}  flex flex-col p-2 shadow-lg rounded-md bg-[#fffe] backdrop-blur-sm border `}>
        <label htmlFor="condition" className='text-sm text-[#333] flex items-center gap-1'>Screen <ForwardRoundedIcon sx={{fontSize:16}}/></label>
        {
            !list&&
            <div
                id="displayRoot"
            >
               {
                display
               } 
            </div>
        }
    </div>
  );
}

export default Screen;