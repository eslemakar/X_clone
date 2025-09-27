import ForgotPassword from "./forgot-password";
import EmailInput from "./email-input";
import PasswordInput from "./password-input";
import AuthToggle from "./auth-toggle";
import { useState } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Form = () => {
  const navigate = useNavigate();
  //kaydolma modunda mıyız
  const [isSignUp, setIsSignUp] = useState(false);

  //forma tıklama işlemi : click section
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
      //kaydolma modundaysak: hesap oluştur
      if (isSignUp) {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        //email correction
        await sendEmailVerification(res.user);
        //bildirim gönder
        toast.info("Mailinize doğrulama e-postası gönderildi.");
        //giriş yapma moduna geç
        setIsSignUp(false);
      } else {
        //giriş yapma modundaysak : oturum aç
        const res = await signInWithEmailAndPassword(auth, email, password);

        //mailini doğrulamamışsa bildirim gönder
        if (!res.user.emailVerified) {
          return toast.info("Lütfen mailinizi doğrulayın");
        }
        //mailini doğrulamış ise anasayfaya yönlendir
        navigate("/feed");
        toast.success("Oturumunuz açıldı");
      }
      //formu sıfırlar
      e.target.reset();
    } catch (error) {
      //hatayı bildirim olarak gönder
      toast.error("Hata:" + error.code);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <EmailInput />

      <PasswordInput />
      {/* koşullu render */}
      {!isSignUp ? <ForgotPassword /> : <div className="h-[28px] w-1" />}

      <button
        type="submit"
        className="mt-10 mb-5 bg-white text-black rounded full p-1 font-bold hover:bg-gray-300 cursor-pointer"
      >
        {isSignUp ? "Sign Up" : "Sign in"}
      </button>

      <AuthToggle isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    </form>
  );
};

export default Form;
