function QRCodeFrame({ qrcodeTop }) {
  return (
    <div
      className="absolute left-1/2 -translate-1/2  p-32 z-2 "
      style={{ top: qrcodeTop }}
    >
      {/* QR Code Frame */}
      <div className="absolute top-0 left-0 size-12 border-t-8 border-l-8 border-gray-200 rounded-tl-xl">
      </div>
      <div className="absolute top-0 right-0 size-12 border-t-8 border-r-8 border-gray-200 rounded-tr-xl"></div>
      <div className="absolute bottom-0 left-0 size-12 border-b-8 border-l-8 border-gray-200 rounded-bl-xl"></div>
      <div className="absolute bottom-0 right-0 size-12 border-b-8 border-r-8 border-gray-200 rounded-br-xl"></div>

      {/* Mask */}
      <div className="bg-black opacity-40 size-3 rounded-br-full absolute top-0 left-0 -z-1"></div>
      <div className="bg-black opacity-40 size-3 rounded-bl-full absolute top-0 right-0 -z-1"></div>
      <div className="bg-black opacity-40 size-3 rounded-tr-full absolute bottom-0 left-0 -z-1"></div>
      <div className="bg-black opacity-40 size-3 rounded-tl-full absolute bottom-0 right-0 -z-1"></div>

    </div>
  );
}

export default QRCodeFrame;
