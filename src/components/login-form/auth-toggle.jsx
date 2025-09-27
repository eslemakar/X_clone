const AuthToggle = ({ isSignUp, setIsSignUp }) => {
  return (
    <p className="mt-5">
      <span className="text-gray-500 select-none">
        {isSignUp ? "Already have an account" : "Don't have an account"}
      </span>
      <span
        className="cursor-pointer ms-2 text-blue-500 hover:underline"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? "Sign in" : "Sign Up"}
      </span>
    </p>
  );
};

export default AuthToggle;
