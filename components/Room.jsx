import { statusColors } from "@data"

function Room({ roomNumber, name, status, col_span, handleOnClick, showName }) {
  
  
  return (
    <div 
        style={{ gridColumn: `span ${col_span} / span ${col_span}`,}}
        className='w-full'
    >
        <div className={`relative z-1 bg-gray-200 rounded-md shadow-sm  flex justify-center items-center text-center text-sm w-full h-full p-1
        ${status === "none" ? 'hidden' : ''}
        ${status !== "none" && status !== "unavailable" ? 'cursor-pointer hover:scale-105' : ''}`}
          style={{ backgroundColor : statusColors[status]}}
          onClick={status !== "none" && status !== "unavailable" ? () => handleOnClick(roomNumber) : () => {}}
        >
          {showName && name}
        </div>
        
    </div>
  )
}

export default Room