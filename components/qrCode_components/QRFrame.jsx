function QRCodeFrame() {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-1/2 p-32 z-2 shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] rounded-xl"
    >
      {/* QR Code Frame */}
      <div className="absolute top-0 left-0 size-12 border-t-8 border-l-8 border-gray-200 rounded-tl-xl">
      </div>
      <div className="absolute top-0 right-0 size-12 border-t-8 border-r-8 border-gray-200 rounded-tr-xl"></div>
      <div className="absolute bottom-0 left-0 size-12 border-b-8 border-l-8 border-gray-200 rounded-bl-xl"></div>
      <div className="absolute bottom-0 right-0 size-12 border-b-8 border-r-8 border-gray-200 rounded-br-xl"></div>

    </div>
  );
}

export default QRCodeFrame;
