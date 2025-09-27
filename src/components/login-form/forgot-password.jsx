import { useState, useRef } from "react";
import Modal from "../modal";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef();

  const handlePasswordReset = () => {
    const email = inputRef.current.value;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Mailinize şifre sıfırlama bağlantısı gönderldi");
        setIsOpen(false);
      })
      .catch(() => toast.error("Mail gönderilemedi"));
  };
  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-end text-sm text-gray-500
   hover:text-gray-400 mt-2 cursor-pointer"
      >
        Forgot Password?
      </button>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl">Forgot Password?</h1>
          <p className="text-zinc-300">
            We`ll email you a link to reset your password
          </p>
          <input ref={inputRef} className="input mt-10 h-[33px]" />
          <button
            type="button"
            onClick={handlePasswordReset}
            className="bg-white hover:bg-gray-300 transition text-black rounded-full mt-8 py-1"
          >
            Send a password reset link
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-400 hover:bg-gray-500 transition text-black rounded-full mt-1 py-1"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ForgotPassword;
