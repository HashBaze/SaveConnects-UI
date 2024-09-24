export default function GalleryImageRemoveModel({
  onClose,
  onConfirm,
  message,
}: any) {
  return (
    <div className="fixed z-50 inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center p-6">
      <div className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-[300px] p-6">
        <div className="flex bg-white text-white px-4 rounded-t-lg items-center justify-between">
          <div className="flex-grow text-center">
            <h2 className="text-lg text-naviblue font-semibold">Delete ?</h2>
          </div>
        </div>
        <p className="text-sm text-gray-500 font-medium text-center px-[20px]">
          {message}
        </p>
        <div className="flex flex-row gap-2 items-center justify-center">
          <button
            onClick={onClose}
            className="flex items-center justify-center bg-naviblue w-[200px] h-[40px] p-2 rounded-lg cursor-pointer hover:bg-naviblue/90 border border-naviblue"
          >
            <img
              src="/icon/close.svg"
              alt="Close"
              className="w-8 h-8"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="text-white text-base text-sm ml-2">Cancel</span>
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center justify-center bg-naviblue w-[200px] h-[40px] rounded-lg cursor-pointer hover:bg-naviblue/90 border border-naviblue mt-4 mb-4"
          >
            <img
              src="/icon/done.svg"
              alt="Done"
              className="w-8 h-8"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="text-white text-base text-sm ml-2">Yes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
