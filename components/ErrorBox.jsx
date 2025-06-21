import Image from "@node_modules/next/image";

function ErrorBox({ src, alt, header, message, handleOnclick, buttonText, color }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white text-white px-8 pt-6 pb-4 rounded-xl z-3 shadow-lg text-center w-full  max-w-[340px] flex flex-col justify-center items-center">
      <div>
        <Image src={src} alt={alt} width={36} height={36} />
      </div>

      <h3 className="text-xl text-gray-700 mt-2">{header}</h3>
      <p className="leading-6 mt-2 text-slate-gray px-3">
        {message}
      </p>

      <hr className="w-full border border-gray-300 my-5" />
      <button
        className={`text-lg text-white bg-gradient-to-r hover:bg-gradient-to-br focus:outline-none font-medium text-center shadow-sm cursor-pointer py-2 w-4/5 rounded-2xl 
            ${color === 'red' && 'from-red-400 via-red-500 to-red-600 shadow-red-500/50'}
            ${color === 'green' && 'from-green-400 via-green-500 to-green-600 shadow-green-500/50'}`}
        onClick={handleOnclick}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ErrorBox;
