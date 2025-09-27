import GoogleButton from "./google-button";
import Form from "../../components/login-form";
const Login = () => {
  return (
    <div className="h-screen bg-[#242424] text-white grid place-items-center px-4">
      <div className="bg-black py-16 px-28 rounded-lg flex flex-col gap-10 sm:w-[80%] max-w-[490px]">
        <div className="flex justify-center">
          <img src="public/logo.jpg" alt="x logo " className="h-[60px]" />
        </div>
        <h1 className="text-2xl md:text-2xl font-bold text-center ">Sign in to X</h1>
  

      <GoogleButton />
      <Form />
       </div>
    </div>
  );
};

export default Login;
