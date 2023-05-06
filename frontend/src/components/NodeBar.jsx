import React from 'react'
import { cats } from '../assets/cats';
import nodesArray from '../assets/nodesArray';




function NodeBar({onDragStart,catSelected}) {
  return (
            <div className="w-[240px] border-r border-[#fff3] bg-[#fff] flex flex-col">
              <h1 className="text-gray-700 text-2xl p-3">{catSelected}</h1>
              <div className="flex flex-col items-start justify-start px-3 overflow-auto flex-1">
                {
                  cats.map((cat,key1)=>{
                    if (cat.name==catSelected) {
                    return(
                      <div key={key1} className="flex flex-col items-start">
                      {

                      nodesArray.filter(n=>n.cat==cat.name).map((n, key) => {
                        return (
                          <div
                            key={key}
                            draggable
                            onDragStart={(event) => onDragStart(event, n.type)}
                            className="my-1"
                          >
                            {n.node}
                          </div>
                        );
                      })

                      }
                      </div>
                    )
                    }
                  })
                }
              </div>
            </div>
  )
}

export default NodeBar