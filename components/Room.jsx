function Room({ number, name, status, col_span }) {
  return (
    <div 
        style={{ gridColumn: `span ${col_span} / span ${col_span}`,}}
        className={`w-full`}
    >
        <div className={`bg-gray-200 rounded-lg shadow-md flex justify-center items-center text-center text-sm w-20 h-20
        ${status === "none" && 'hidden'}`}>
          {status === ''}
            {name}
        </div>
        
    </div>
  )
}

export default Room