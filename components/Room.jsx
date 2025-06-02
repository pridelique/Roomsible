function Room({ number, name, status, col_span }) {
  return (
    <div 
        style={{ gridColumn: `span ${col_span} / span ${col_span}`,}}
        className={`w-full
        `}
    >
        <div className={`bg-gray-200 rounded-lg shadow-md h-20 flex justify-center items-center text-center 
        ${status === "none" && 'hidden'}`}>
            {name}
        </div>
        
    </div>
  )
}

export default Room