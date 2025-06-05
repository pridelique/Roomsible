
function Room({ roomNumber, name, status, col_span, onClick }) {
  
  const colors = {
  "available":  "#86EFAC",  // green - soft lime pastel
  "unavailable": "#D1D5DB", // gray - soft modern
  "booked":      "#FCA5A5", // red - light pinkish red
  "booking":     "#93C5FD", // blue - pastel blue
  "pending":     "#FEF08A"  // yellow - warm pastel yellow
}
  
  return (
    <div 
        style={{ gridColumn: `span ${col_span} / span ${col_span}`,}}
        className='w-full hover:scale-105'
    >
        <div className={`relative z-8 bg-gray-200 rounded-md shadow-md flex justify-center items-center text-center text-sm w-full h-full
        ${status === "none" ? 'hidden' : ''}
        ${status === "available" ? 'cursor-pointer' : ''}`}
          style={{ backgroundColor : colors[status]}}
          onClick={status === 'available' ? () => onClick(roomNumber) : () => {}}
        >
            {name}
        </div>
        
    </div>
  )
}

export default Room