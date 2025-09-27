import { navSections } from "../../utils/constants";
import { FaDoorOpen as Door } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
const Nav = ({ user }) => {
  console.log(user);
  return (
    <nav className="flex flex-col justify-between items-start px-5 py-4">
      {/* link */}
      <div>
        <img src="public/logo.jpg" alt="x" className="w-14 mb-4" />
        {navSections.map((item, key) => (
          <div
            key={key}
            className="flex items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer rounded-lg transition hover:bg-tw-gray max-md:justify-center"
          >
            {item.icon}
            <span className="whitespace-nowrap max-md:hidden">
              {item.title}{" "}
            </span>
          </div>
        ))}
      </div>
      {/* user */}
      <div>
        <div className="flex max-md:flex-col gap-4 justify-between max-md:items-center">
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL || "public/avatar.png"}
              alt={user.displayName || "User"}
              className="w-9 h-9 rounded-full object-cover "
            />
            <div>
              <p className="max-md:hidden text-sm">
                {" "}
                {user.displayName || "Eslem Akar"}
              </p>
              <p className="max-md:hidden text-sm text-zinc-400">
                {" "}
                {user.displayName || "eslem_akar"}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut(auth)}
            className="text-xl cursor-pointer "
            title="Sign Out"
          >
            <Door />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
