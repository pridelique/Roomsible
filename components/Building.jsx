'use client'
import building from "@data/buildings"
import Room from "./Room";

function Building({ id }) {
  console.log(building[id]["col"]);
  
  return (
    <div className="flex flex-col gap-4"> 
      {building[id]["rooms"].map((row, index) => (
        <div 
          key={index} 
          className='grid gap-2'
          style={{gridTemplateColumns: `repeat(${building[id]["col"]}, minmax(0, 1fr))`,}}
        > 
          {row.map((room, index) => (
            <Room {...room} key={index}/>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Building