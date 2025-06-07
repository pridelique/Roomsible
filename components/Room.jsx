import { statusColors } from "@data"

function Room({ roomNumber, name, status, col_span, onClick }) {
  
  
  return (
    <div 
        style={{ gridColumn: `span ${col_span} / span ${col_span}`,}}
        className='w-full'
    >
        <div className={`relative z-8 bg-gray-200 rounded-md shadow-md flex justify-center items-center text-center text-sm w-full h-full
        ${status === "none" ? 'hidden' : ''}
        ${status === "available" ? 'cursor-pointer hover:scale-105' : ''}`}
          style={{ backgroundColor : statusColors[status]}}
          onClick={status === 'available' ? () => onClick(roomNumber) : () => {}}
        >
            {name}
        </div>
        
    </div>
  )
}

export default Room