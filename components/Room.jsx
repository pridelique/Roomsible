function Room({ number, name, status, col_span }) {
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
        className={`w-full`}
    >
        <div className={`bg-gray-200 rounded-md shadow-md flex justify-center items-center text-center text-sm w-full h-full
        ${status === "none" && 'hidden'}`}
          style={{ backgroundColor : colors[status]}}
        >
            {name}
        </div>
        
    </div>
  )
}

export default Room