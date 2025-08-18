import "@styles/loading.css"

function Loading() {
  return (
    <div className="fixed inset-0 bg-[#f5f5f5] bg-opacity-75 flex justify-center items-center z-50 scale-120">
      {/* <div className="border-3 border-gray-100 border-t-3 border-t-red-400 rounded-full p-6 animate-spin shadow-inner"></div> */}
      <div className="pin"></div>
      <div className="pulse"></div>
    </div>
  );
}

export default Loading;
