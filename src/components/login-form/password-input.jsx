import { useState } from "react";
import { IoEyeOutline as Open, IoEyeOffSharp as Closed } from "react-icons/io5";
const PasswordInput = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="mt-5">
      <label>Password</label>

      <div className="relative w-full">
        <input
          type={isShow ? "text" : "password"}
          name="password"
          className="input"
        />

        <span
          className="absolute end-2 top-[50%] -translate-y-[50%] text-zinc-700 text-xl cursor-pointer"
          onClick={() => setIsShow(!isShow)}
        >
        { isShow ? <Open /> : <Closed/> }  
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
