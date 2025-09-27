import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
const GoogleButton = () => {
  const navigate = useNavigate();
  const handleGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      navigate("/feed");
    });
    toast.success("Oturumunuz Açıldı");
  };
  
  return (
    <button
      onClick={handleGoogle}
      className="bg-white flex items-center justify-center py-2 px-4 rounded-full text-black hover:bg-gray-300 whitespace-nowrap gap-x-3 transition cursor-pointer"
    >
      <img src="public/google-logo.png" alt="Google Logo" className="h-5" />
      <span className="font-medium text-md">Sign in with google</span>
    </button>
  );
};

export default GoogleButton;
