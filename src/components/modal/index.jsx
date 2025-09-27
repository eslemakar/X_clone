import { IoMdClose } from "react-icons/io";
//higher order component
const Modal = ({ children, isOpen, close }) => {
  return (
    isOpen && (
      <div
        className="fixed bg-zinc-800/50
  inset-0 backdrop-blur-md z-[999] grid place-items-center">
        <div className="bg-black py-10 px-8 w-3/4 max-w-[500px] rounded-md">
          <div className="flex justify-end">
            <button onClick={close}>
              <IoMdClose className="text-3xl transition hover:text-gray-500" />
            </button>
          </div>
          {/* prop olarak alınan içerik */}
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
